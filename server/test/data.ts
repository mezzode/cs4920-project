import { db } from '../src/helpers/db';
import { pgp } from '../src/helpers/db';

// TODO: auto-convert between snakecase and camelcase
export const users = [{ username: 'jfu', password: 'foobar' }];

export const media = [{ api_id: 12345 }, { api_id: 9175 }];

export const lists = [{ name: "mezzode's List", userId: 1 }];

export const entries = [
    {
        category: 'In Progress',
        finished: '2018',
        list_id: 1,
        media_id: 1,
        rating: 9,
        started: '2016',
    },
    {
        category: 'Complete',
        finished: '2017-10-01',
        list_id: 1,
        media_id: 2,
        rating: 8,
        started: '2017-10-01',
    },
    {
        category: 'In Progress',
        finished: '2017-10-01',
        list_id: 1,
        media_id: 1,
        rating: 7,
        started: '2017-10-01',
    },
    {
        category: 'Complete',
        finished: '2017-10-01',
        list_id: 1,
        media_id: 2,
        rating: 6,
        started: '2017-10',
    },
];

export const seedTestData = () =>
    db.task(async t => {
        await t.none(
            'TRUNCATE TABLE users, media, list, entry RESTART IDENTITY',
        );
        await t.none(
            pgp.helpers.insert(users, ['username', 'password'], 'users'),
        );
        await t.none(pgp.helpers.insert(media, ['api_id'], 'media'));
        await t.none(
            pgp.helpers.insert(
                lists,
                ['name', { name: 'user_id', prop: 'userId' }],
                'list',
            ),
        );
        await t.none(
            pgp.helpers.insert(
                entries,
                [
                    'media_id',
                    'category',
                    'rating',
                    'started',
                    'finished',
                    'list_id',
                ],
                'entry',
            ),
        );
    });
