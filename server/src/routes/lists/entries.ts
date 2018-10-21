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
import { fetchMedia } from '../api/mediaapi';
import { Entry, MediaType, UserEntry } from './types';

export const entryFields = `
    e.id AS "entryId",
    e.last_updated AS "lastUpdated",
    e.category,
    e.tags,
    e.rating,
    e.started,
    e.finished,
    e.media_id AS "mediaId",
    e.list_id AS "listId"`;

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
        tags: string;
        mediaType: MediaType;
    }>(
        // TODO: separate the select clause so can reuse (e.g. same as in lists.ts)
        `SELECT ${entryFields}, l.media_type AS "mediaType"
        FROM entry e
        JOIN list l ON l.id = e.list_id
        WHERE e.id = $(entryId)`,
        { entryId },
    );
    if (!row) {
        throw new HandlerError('Entry not found', 404);
    }

    const { mediaId, mediaType, ...other } = row;
    const entry = {
        ...idsToCodes(other),
        media: await fetchMedia(mediaId, mediaType),
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
    } & UserEntry = req.body;

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

    const insertedEntry = await db.task<Entry>(async t => {
        // TODO: consider checking for existence of list first so can
        // return "List not found" instead of generic error

        const { mediaType } = await t.one<{ mediaType: MediaType }>(
            `SELECT media_type AS "mediaType"
            FROM list l
            WHERE l.id = $(listId)`,
            { listId },
        );

        // note this returns list_id, etc. in snake case
        const { entryId, ...insertedData } = await t.one<
            { entryId: number; lastUpdated: string } & UserEntry
        >(
            `${pgp.helpers.insert(entry, undefined, 'entry')}
            RETURNING $(data:name), id AS "entryId", last_updated AS "lastUpdated"`,
            { entry, data },
        );
        const entryCode = hashids.encode(entryId);
        const listCode = hashids.encode(listId);

        return {
            entryCode,
            listCode,
            ...insertedData,
            media: await fetchMedia(mediaId, mediaType),
        };
    });

    res.json(insertedEntry);
});

const validateEntryData = (
    entry: Partial<UserEntry>,
): entry is Partial<UserEntry> => {
    try {
        // TODO: figure out automatic way to check body against interfaces. json-schema?
        const fields = [
            'rating',
            'started',
            'finished',
            // 'progress', // TODO
            'category',
            'tags',
        ];
        fields.forEach(f => {
            if (!(f in entry)) {
                throw new Error(`Entry is missing field "${f}"`);
            }
        });
        Object.keys(entry).forEach(k => {
            if (!fields.includes(k)) {
                throw new Error(`${k} is not a valid entry field.`);
            }
        });

        const uniqueTags = new Set(entry.tags);
        if (uniqueTags.size !== entry.tags!.length) {
            throw new Error('Duplicate tags');
        }

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
        // TODO: consider just directly throwing HandlerErrors
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

    const editedEntry = await db.task<Entry>(async t => {
        const { mediaId, ...updatedEntry } = await t.one<{
            entryId: number;
            mediaId: number;
            listId: number;
            category: string;
            tags: string[];
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
            RETURNING
                id AS "entryId",
                last_updated AS "lastUpdated",
                category,
                tags,
                rating,
                started,
                finished,
                media_id AS "mediaId",
                list_id AS "listId"`,
            { entryId, entryUpdate },
        );

        const { mediaType } = await t.one<{ mediaType: MediaType }>(
            `SELECT media_type AS "mediaType"
            FROM list l
            JOIN entry e ON e.id = $(entryId) AND e.list_id = l.id`,
            { entryId },
        );

        return {
            ...(idsToCodes(updatedEntry) as Entry),
            media: await fetchMedia(mediaId, mediaType),
        };
    });

    res.json(editedEntry);
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
