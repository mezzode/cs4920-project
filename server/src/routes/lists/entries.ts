import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { db, pgp } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import {
    bodyCodesToIds,
    hashids,
    idsToCodes,
    paramCodesToIds,
} from '../../helpers/id';
import { UserEntry } from './types';

const entryFields = `
    id AS "entryId",
    last_updated AS "lastUpdated",
    category,
    rating,
    started,
    finished,
    media_id AS "mediaId",
    list_id AS "listId"
`;

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
        `SELECT ${entryFields}
        FROM entry e
        WHERE e.id = $(entryId)`,
        { entryId },
    );
    if (!row) {
        throw new HandlerError('Entry not found', 404);
    }

    const { mediaId, ...other } = row;
    const entry = {
        ...idsToCodes(other),
        media: {
            // TODO: get media data
            artUrl:
                'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
            mediaCode: hashids.encode(mediaId),
            title: `Title of media ID ${mediaId}`,
        },
    };

    res.send(entry);
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
        // TODO: figure out automatic way to check body against interfaces. json-schema?
        const fields = ['rating', 'started', 'finished', 'progress'];
        Object.keys(entry).forEach(k => {
            if (!fields.includes(k)) {
                throw new Error(`${k} is not a valid entry field.`);
            }
        });

        if (entry.started && !DateTime.fromISO(entry.started!).isValid) {
            return false;
        }
        if (entry.finished && !DateTime.fromISO(entry.finished!).isValid) {
            return false;
        }
        if (entry.rating && (entry.rating < 0 || entry.rating > 10)) {
            // TODO: ensure int. maybe find a validation library instead
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
    const { mediaId, ...updatedEntry } = await db.one<{
        entryId: number;
        mediaId: number;
        listId: number;
        category: string;
        rating: number;
        lastUpdated: string;
        started: string;
        finished: string;
        last_updated: string;
    }>(
        `${pgp.helpers.update(
            { ...entryUpdate, last_updated: DateTime.local() },
            undefined,
            'entry',
        )}
        WHERE id = $(entryId)
        RETURNING ${entryFields}`,
        { entryId, entryUpdate },
    );
    res.json({
        ...idsToCodes(updatedEntry),
        media: {
            // TODO: get media data
            artUrl:
                'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
            mediaCode: hashids.encode(mediaId),
            title: `Title of media ID ${mediaId}`,
        },
    });
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

export const entryRouter = Router();
entryRouter.use(bodyCodesToIds);
entryRouter
    .route('/entry/:entryCode')
    .all(paramCodesToIds)
    .get(getEntry)
    .post(updateEntry)
    .delete(deleteEntry);
entryRouter.post('/entry', newEntry);
