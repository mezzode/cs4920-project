import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { auth } from '../../auth';
import { db } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import { hashids } from '../../helpers/id';
import { fetchMedia } from '../api/mediaapi';
import { entryFields } from './entries';
import { EntryList, MediaType } from './types';

const getList = asyncHandler(async (req, res) => {
    const { listCode } = req.params;
    const [listId] = hashids.decode(listCode);
    const list = await db.task<EntryList>(async t => {
        const listMeta = await t.oneOrNone<{
            name: string;
            mediaType: MediaType;
            username: string;
        }>(
            `SELECT l.name, l.media_type AS "mediaType", u.username
        FROM list l JOIN users u ON u.id = l.user_id AND l.id = $(listId)`,
            {
                listId,
            },
        );
        if (!listMeta) {
            throw new HandlerError('List not found', 404);
        }
        const entries = await t.manyOrNone<{
            entryId: number;
            lastUpdated: string;
            rating: number;
            started: string;
            finished: string;
            // progress: string; // TODO: add progress to db
            mediaId: number;
            tags: string[];
            category: string;
        }>(
            `SELECT
                ${entryFields}
            FROM entry e
            WHERE e.list_id = $(listId)`,
            { listId },
        );
        return {
            entries: await Promise.all(
                entries.map(async ({ entryId, mediaId, ...entry }) => ({
                    ...entry,
                    entryCode: hashids.encode(entryId),
                    listCode,
                    media: await fetchMedia(mediaId, listMeta.mediaType),
                    progress: 'Placeholder', // TODO: add progress column to db
                })),
            ),
            listCode,
            ...listMeta,
        };
    });
    res.json(list);
});

const newList = asyncHandler(async (req, res) => {
    const { username } = req.user;
    const { userId } = await db.one<{
        userId: number;
    }>(
        `SELECT u.id AS "userId"
        FROM users u
        WHERE u.username = $(username)`,
        { username },
    );

    const {
        name,
        mediaType,
    }: { name: string; mediaType: MediaType } = req.body;
    const { listId, ...inserted } = await db.one<{
        name: string;
        listId: number;
        mediaType: MediaType;
    }>(
        `INSERT INTO list(name, user_id, media_type)
        VALUES ($(name), $(userId), $(mediaType))
        RETURNING name, id AS "listId", media_type AS "mediaType"`,
        { userId, name, mediaType },
    );
    const listCode = hashids.encode(listId);
    res.json({
        listCode,
        ...inserted,
        entries: [],
        username,
    });
});

const updateList = asyncHandler(async (req, res) => {
    const { listCode } = req.params;
    const [listId] = hashids.decode(listCode);

    const { username } = await db.one<{
        username: string;
    }>(
        `SELECT u.username AS username
        FROM list l
        JOIN users u ON l.user_id = u.id AND l.id = $(listId)`,
        { listId },
    );
    if (req.user.username !== username) {
        throw new HandlerError('Not authorised to edit this list', 403);
    }

    const { name }: { name: string } = req.body;
    if (name.length === 0) {
        throw new HandlerError('Invalid data', 400);
    }
    const updated = await db.oneOrNone<{
        name: string;
    }>(
        `UPDATE list SET name = ($(name))
        WHERE id = $(listId)
        RETURNING name`,
        { listId, name },
    );
    if (!updated) {
        throw new HandlerError('List not found', 404);
    }
    res.json(updated);
});

const deleteList = asyncHandler(async (req, res) => {
    const { listCode } = req.params;
    const [listId] = hashids.decode(listCode);

    const { username } = await db.one<{
        username: string;
    }>(
        `SELECT u.username AS username
        FROM list l
        JOIN users u ON l.user_id = u.id AND l.id = $(listId)`,
        { listId },
    );
    if (req.user.username !== username) {
        throw new HandlerError('Not authorised to edit this list', 403);
    }

    const deleted = await db.oneOrNone<{
        id: number;
        mediaType: MediaType;
    }>(
        `DELETE FROM list
        WHERE id = $(listId)
        RETURNING name, media_type AS "mediaType"`,
        { listId },
    );
    if (!deleted) {
        throw new HandlerError('List not found', 404);
    }
    res.json({
        ...deleted,
        listCode,
    });

    res.json(deleted);
});

export const listRouter = Router();
listRouter.use(auth.unless({ method: 'GET' }));
listRouter
    .route('/:listCode')
    .get(getList)
    .patch(updateList)
    .delete(deleteList);
listRouter.route('/').post(newList);
