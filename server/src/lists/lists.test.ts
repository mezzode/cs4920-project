import * as request from 'supertest';
import { app } from '../app';
import { db, pgp } from '../helpers/db';
import { hashids } from '../helpers/id';

// TODO: prolly should use an sql file and import/run that
// TODO: auto-convert between snakecase and camelcase
const users = [{ username: 'jfu', password: 'foobar' }];

const media = [{ api_id: 12345 }, { api_id: 9175 }];

const lists = [{ name: "mezzode's List", userId: 1 }];

const entries = [
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

const seedTestData = () =>
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
// TODO: use transactions and rollback after each test instead of fully empting and re-inserting everything

describe('Test lists endpoints', () => {
    beforeEach(() => {
        return seedTestData();
    });

    afterAll(() => {
        // close db connection so script exits
        return db.$pool.end();
    });

    /**
     * Helper function for GET.
     *
     * This returns a Promise so remember to `await` it or such otherwise the db will not close.
     */
    const testGet = (listCode: string, status = 200) =>
        request(app)
            .get(`/list/${listCode}`)
            .set('Accept', 'application/json')
            .expect(status);

    describe('Test list get', () => {
        test('Can get list', async () => {
            const i = 0;
            const listCode = hashids.encode(i + 1);
            const res = await testGet(listCode);

            const { body } = res;
            expect(body).toBeDefined();
            expect(body.name).toEqual("mezzode's List");
            expect(body.entries).toHaveLength(entries.length);
            body.entries.forEach((entry: { listCode: string }) => {
                expect(entry.listCode).toEqual(listCode);
            });
        });
    });
});
