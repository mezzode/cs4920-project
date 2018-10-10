import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { db } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import { hashids } from '../../helpers/id';
import { EntryList, MediaType } from '../lists/types'; // TODO: consolidate types

const getLists = asyncHandler(async (req, res) => {
    const { mediaType } = req.params;
    const { userId } = res.locals;

    const lists = await db.task<EntryList[]>(async t => {
        const rows = await t.manyOrNone<{
            name: string;
            id: number;
            mediaType: MediaType;
        }>(
            `
            SELECT name, id, media_type AS "mediaType"
            FROM list
            WHERE
                user_id = $(userId) AND
                media_type = $(mediaType)
        `,
            {
                mediaType,
                userId,
            },
        ); // can replace with t.map
        return Promise.all(
            rows.map(async ({ name, id }) => {
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
                WHERE e.list_id = $(id)`,
                    { id },
                );
                const listCode = hashids.encode(id);
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
                    mediaType,
                    name,
                };
            }),
        );
    });
    res.json({ lists });
});

export const userListsRouter = Router();
userListsRouter.route('/lists/:mediaType').get(getLists);
