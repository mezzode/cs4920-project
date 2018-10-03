import { RequestHandler, Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { db, pgp } from '../helpers/db';
import { HandlerError } from '../helpers/error';
import { hashids } from '../id';
import { UserEntry } from './types';

const getEntry = asyncHandler(async (req, res) => {
    const { entryId }: { entryId: number } = req.params;
    const row = await db.oneOrNone<{
        entryId: number;
        mediaId: number;
        listId: number;
        category: string;
        rating: number;
        lastUpdated: string;
        started: string;
        finished: string;
    }>(
        // TODO: separate the select clause so can reuse (e.g. same as in lists.ts)
        `SELECT
            id AS "entryId",
            last_updated AS "lastUpdated",
            category,
            rating,
            started,
            finished,
            media_id AS "mediaId",
            list_id AS "listId"
        FROM entry e
        WHERE e.id = $(entryId)`,
        { entryId },
    );
    // TODO: add media data to entry
    if (!row) {
        throw new HandlerError('Entry not found', 404);
    }
    const { entryId: _, mediaId, listId, ...entry } = row;
    // TODO: change ids to codes. consider making a separate function for this
    res.send({
        ...entry,
        listCode: hashids.encode(listId),
        mediaCode: hashids.encode(mediaId),
    });
});

const newEntry = asyncHandler(async (req, res) => {
    const {
        listId,
        mediaId,
        ...data
    }: {
        listId: number;
        mediaId: number;
    } & Partial<UserEntry> = req.body;

    if (!validateEntryData(data)) {
        throw new HandlerError('Invalid entry', 400);
    }

    // const userId = 1; // TODO: get from auth
    // TODO: authorisation. check that the user owns the list.
    const entry = {
        list_id: listId,
        media_id: mediaId,
        ...data,
    };

    // TODO: consider checking for existence of list first so can
    // return "List not found" instead of generic error

    // note this returns list_id, etc. in snake case
    const { entryId, ...insertedData } = await db.one<
        { entryId: number } & UserEntry
    >(
        `${pgp.helpers.insert(entry, undefined, 'entry')}
        RETURNING $(data:name), id AS "entryId"`,
        { entry, data },
    );
    const entryCode = hashids.encode(entryId);
    const listCode = hashids.encode(listId);
    const mediaCode = hashids.encode(mediaId);

    const insertedEntry = {
        entryCode,
        listCode,
        mediaCode,
        ...insertedData,
    };

    res.json(insertedEntry);
});

const validateEntryData = (
    entry: Partial<UserEntry>,
): entry is Partial<UserEntry> => {
    try {
        if ('started' in entry && !DateTime.fromISO(entry.started!).isValid) {
            return false;
        }
        if ('finished' in entry && !DateTime.fromISO(entry.finished!).isValid) {
            return false;
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const updateEntry = asyncHandler(async (req, res) => {
    // TODO: authorisation. check that the user actually owns the entry.
    const entryUpdate = req.body;
    if (!validateEntryData(entryUpdate)) {
        throw new HandlerError('Invalid entry', 400);
    }
    const { entryId } = req.params;
    const updatedEntry = await db.one<
        { last_updated: string } & typeof entryUpdate
    >(
        `${pgp.helpers.update(entryUpdate, undefined, 'entry')}
        WHERE id = $(entryId)
        RETURNING $(entryUpdate:name), last_updated AS "lastUpdated"`,
        { entryId, entryUpdate },
    );
    res.json(updatedEntry);
});

const deleteEntry = asyncHandler(async (req, res) => {
    const { entryId }: { entryId: number } = req.params;
    const deletedRow = await db.oneOrNone<{
        id: number;
        media_id: number;
        user_id: number;
        list_id: number;
        category: string;
        rating: number;
        last_updated: string;
        started: string;
        finished: string;
    }>(
        `DELETE FROM entry
        WHERE id = $(entryId)
        RETURNING *`,
        { entryId },
    );
    if (!deletedRow) {
        throw new HandlerError('Entry not found', 404);
    }

    const {
        media_id: mediaId,
        list_id: listId,
        last_updated: lastUpdated,
        ...rest
    } = deletedRow;

    const deletedEntry = {
        entryCode: hashids.encode(entryId),
        lastUpdated,
        listCode: hashids.encode(listId),
        mediaCode: hashids.encode(mediaId),
        ...rest,
    };

    res.json(deletedEntry);
});

// TODO: consider creating middleware for checking authorisation instead of doing in each handler

const paramCodesToIds: RequestHandler = (req, res, next) => {
    if (!req.params) {
        next();
    }
    req.params = mapCodesToIds(req.params);
    next();
};

const bodyCodesToIds: RequestHandler = (req, res, next) => {
    if (!req.body) {
        next();
    }
    req.body = mapCodesToIds(req.body);
    next();
};

/**
 * Replaces codes with ids in a given object.
 */
function mapCodesToIds(obj: object) {
    const fields = ['entry', 'media', 'list'];
    return fields.reduce((newObj, field) => {
        const fieldCode = `${field}Code`;
        if (!(fieldCode in newObj)) {
            return newObj;
        }
        const [id] = hashids.decode(newObj[fieldCode]);
        if (!id) {
            throw new HandlerError('Entry not found', 404);
        }
        delete newObj[fieldCode];
        newObj[`${field}Id`] = id;
        return newObj;
    }, obj);
}

export const entryRouter = Router();
entryRouter.use(bodyCodesToIds);
entryRouter
    .route('/entry/:entryCode')
    .all(paramCodesToIds)
    .get(getEntry)
    .post(updateEntry)
    .delete(deleteEntry);
entryRouter.post('/entry', newEntry);
