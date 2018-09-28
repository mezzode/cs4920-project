import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { db } from '../helpers/db';
import { HandlerError } from '../helpers/error';
import { hashids } from '../id';
import { EntryList } from './types';

const getList = asyncHandler(async (req, res) => {
    const { listCode } = req.params;
    const [listId] = hashids.decode(listCode);
    const list = await db.task<EntryList>(async t => {
        const listMeta = await t.oneOrNone<{ name: string }>(
            `SELECT name FROM list l WHERE id = $(listId)`,
            { listId },
        );
        if (!listMeta) {
            throw new HandlerError('List not found', 404);
        }
        const { name } = listMeta;
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
            name,
        };
    });
    res.json(list);
});

export const listRouter = Router();
listRouter.route('/list/:listCode').get(getList);
