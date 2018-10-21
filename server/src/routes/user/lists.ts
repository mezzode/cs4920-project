import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { db } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import { hashids } from '../../helpers/id';
import { fetchMedia } from '../api/mediaapi';
import { entryFields } from '../lists/entries';
import { EntryList, MediaType } from '../lists/types'; // TODO: consolidate types

const getLists = asyncHandler(async (req, res) => {
    const { media } = req.params;
    const { userId, username } = res.locals;

    const mediaTypes = {
        anime: MediaType.Anime,
        games: MediaType.Game,
        movies: MediaType.Movie,
        shows: MediaType.Show,
    };

    if (!(media in mediaTypes)) {
        throw new HandlerError('Not found', 404);
    }

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
                mediaType: mediaTypes[media],
                userId,
            },
        ); // can replace with t.map
        return Promise.all(
            rows.map(async ({ name, id, mediaType }) => {
                const entries = await t.manyOrNone<{
                    entryId: number;
                    lastUpdated: string;
                    rating: number;
                    started: string;
                    finished: string;
                    tags: string[];
                    category: string;
                    // progress: string; // TODO: add progress to db
                    mediaId: number;
                }>(
                    `SELECT
                        ${entryFields}
                    FROM entry e
                    WHERE e.list_id = $(id)`,
                    { id },
                );
                const listCode = hashids.encode(id);
                return {
                    entries: await Promise.all(
                        entries.map(async ({ entryId, mediaId, ...entry }) => ({
                            ...entry,
                            entryCode: hashids.encode(entryId),
                            listCode,
                            media: await fetchMedia(mediaId, mediaType),
                            progress: 'Placeholder', // TODO: add progress column to db
                        })),
                    ),
                    listCode,
                    mediaType,
                    name,
                    username,
                };
            }),
        );
    });
    res.json({ lists });
});

export const userListsRouter = Router();
userListsRouter.get('/lists/:media', getLists);
