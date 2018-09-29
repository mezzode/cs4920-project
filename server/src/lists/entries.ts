import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { DateTime } from 'luxon';
import { db, pgp } from '../helpers/db';
import { HandlerError } from '../helpers/error';
import { hashids } from '../id';
import { Entry, UserEntry } from './types';

const getEntry = asyncHandler(async (req, res) => {
    const { entryCode } = req.params;
    const [entryId] = hashids.decode(entryCode);
    const entry = await db.oneOrNone<Entry>(
        // TODO: separate the select clause so can reuse (e.g. same as in lists.ts)
        `SELECT
            id AS "entryId",
            last_updated AS "lastUpdated",
            rating,
            started,
            finished,
            media_id AS "mediaId"
        FROM entry e
        WHERE e.id = $(entryId)`,
        { entryId },
    );
    // TODO: add media data to entry
    if (!entry) {
        throw new HandlerError('Entry not found', 404);
    }
    // TODO: change ids to codes. consider making a separate function for this
    res.send(entry);
});

const newEntry = asyncHandler(async (req, res) => {
    const {
        listCode,
        mediaCode,
        ...data
    }: {
        listCode: string;
        mediaCode: string;
    } & Partial<UserEntry> = req.body;

    if (!validateEntryData(data)) {
        throw new HandlerError('Invalid entry', 400);
    }

    // const userId = 1; // TODO: get from auth
    // TODO: authorisation. check that the user owns the list.
    const [listId] = hashids.decode(listCode);
    const [mediaId] = hashids.decode(mediaCode);
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
    const { entryCode } = req.params;
    // TODO: authorisation. check that the user actually owns the entry.
    const entryUpdate = req.body;
    if (!validateEntryData(entryUpdate)) {
        throw new HandlerError('Invalid entry', 400);
    }
    const [entryId] = hashids.decode(entryCode);
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
    const { entryCode } = req.params;
    const [entryId] = hashids.decode(entryCode);
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
        entryCode,
        lastUpdated,
        listCode: hashids.encode(listId),
        mediaCode: hashids.encode(mediaId),
        ...rest,
    };

    res.json(deletedEntry);
});

// TODO: consider creating middleware for checking authorisation instead of doing in each handler

export const entryRouter = Router();
entryRouter
    .route('/entry/:entryCode')
    .get(getEntry)
    .post(updateEntry)
    .delete(deleteEntry);
entryRouter.post('/entry', newEntry);
