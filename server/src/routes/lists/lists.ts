import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { db } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import { hashids } from '../../helpers/id';
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
        }>(
            `SELECT
                id AS "entryId",
                last_updated AS "lastUpdated",
                rating,
                started,
                finished,
                media_id AS "mediaId"
            FROM entry e
            WHERE e.list_id = $(listId)`,
            { listId },
        );
        return {
            entries: entries.map(({ entryId, mediaId, ...entry }) => ({
                ...entry,
                entryCode: hashids.encode(entryId),
                listCode,
                media: {
                    // TODO: get media data
                    artUrl:
                        'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                    mediaCode: hashids.encode(mediaId),
                    title: `Title of media ID ${mediaId}`,
                },
                progress: 'Placeholder', // TODO: add progress column to db
            })),
            listCode,
            ...listMeta,
        };
    });
    res.json(list);
});

const newList = asyncHandler(async (req, res) => {
    const userId = 1; // TODO: get from auth
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
    });
});

const updateList = asyncHandler(async (req, res) => {
    const { listCode } = req.params;
    const [listId] = hashids.decode(listCode);
    const { name }: { name: string } = req.body;
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
    const deleted = await db.oneOrNone<{
        name: string;
        id: number;
    }>(
        `DELETE FROM list
        WHERE id = $(listId)
        RETURNING id, name`,
        { listId },
    );
    if (!deleted) {
        throw new HandlerError('List not found', 404);
    }
    res.json(deleted);
});

export const listRouter = Router();
listRouter
    .route('/list/:listCode')
    .get(getList)
    .patch(updateList)
    .delete(deleteList);
listRouter.route('/list').post(newList);
