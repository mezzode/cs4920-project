import { RequestHandler } from 'express';
import { Router } from 'express';
import { db } from '../helpers/db';
import { hashids } from '../id';
import { EntryList } from './types';

const getList: RequestHandler = async (req, res) => {
    try {
        const { listCode } = req.params;
        const [listId] = hashids.decode(listCode);
        const list = await db.task<EntryList>(async t => {
            const { name } = await t.one<{ name: string }>(
                `SELECT name FROM list l WHERE id = $(listId)`,
                { listId },
            );
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
        res.send(list);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: 'Something went wrong',
        });
    }
};

export const listRouter = Router();
listRouter.route('/list/:listCode').get(getList);
