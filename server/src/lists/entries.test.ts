import * as request from 'supertest';
import { app } from '../app';
import { db } from '../helpers/db';
import { hashids } from '../helpers/id';

// TODO: prolly should use an sql file and import/run that
const seedTestData = () =>
    db.multi(
        `TRUNCATE TABLE users, media, list, entry RESTART IDENTITY;

        INSERT INTO users(username, password)
        VALUES
            ('jfu', 'foobar'),
            ('user1', 'pass1'),
            ('user2', 'pass2'),
            ('user3', 'pass3'),
            ('user4', 'pass4');
        
        INSERT INTO media(api_id)
        VALUES
            ('12345'),
            ('67890');

        INSERT INTO list(name, user_id)
        VALUES
            ('mezzode''s List', 1);

        INSERT INTO entry(media_id, category, rating, started, finished, list_id, last_updated)
        VALUES
            (1, 'In Progress', 9, '2016', '2018', 1, now()),
            (2, 'Complete', 8, '2017-10-01', '2017-10-01', 1, now()),
            (1, 'In Progress', 7, '2017-10-01', '2017-10-01', 1, now()),
            (2, 'Complete', 6, '2017-10', '2017-10-01', 1, now());`,
    );

describe('Test entries endpoints', () => {
    beforeEach(() => {
        return seedTestData();
    });

    afterAll(() => {
        // close db connection so script exits
        return db.$pool.end();
    });

    const testGet = (entryCode: string, status = 200) =>
        request(app)
            .get(`/entry/${entryCode}`)
            .set('Accept', 'application/json')
            .expect(status);

    describe('Test entry create', () => {
        test('Can create new entry', async () => {
            const entry = {
                category: 'In Progress',
                listCode: 'XG', // 1
                mediaCode: 'XG', // 1
                rating: 10,
                started: '2018',
            };
            const res = await request(app)
                .post('/entry')
                .send(entry)
                .set('Accept', 'application/json') // necessary?
                .expect(200);

            const { body } = res;
            expect(body).toBeDefined();

            const { entryCode } = body;
            const [entryId] = hashids.decode(entryCode);
            expect(entryId).toBeGreaterThan(0);

            // TODO: other expectations
        });

        test.skip("Can't create entry for non-existent media", async () => {
            // TODO
        });

        test.skip("Can't create entry for non-existent list", async () => {
            // TODO
        });

        test.skip("Can't create entry with bad data", async () => {
            // TODO
        });
    });

    describe('Test entry get', () => {
        test('Can get entry', async () => {
            const entryCode = 'XG';
            const res = await testGet(entryCode);

            expect(res.body).toBeDefined();

            const { lastUpdated, ...body } = res.body;
            expect(body).toEqual({
                category: 'In Progress',
                finished: '2018',
                listCode: 'XG',
                mediaCode: 'XG',
                rating: 9,
                started: '2016',
            });
        });

        test("Can't get entry with invalid code", async () => {
            const entryCode = 'FaKeCoDe';
            const res = await testGet(entryCode, 404);
            expect(res.body).toEqual({
                error: 'Entry not found',
            });
        });

        test("Can't get non-existent entry", async () => {
            const entryId = 9001;
            const entryCode = hashids.encode(entryId);
            const res = await testGet(entryCode, 404);
            expect(res.body).toEqual({
                error: 'Entry not found',
            });
        });
    });

    describe('Test entry delete', () => {
        test('Can delete entry', async () => {
            const entryCode = 'XG';

            // check that entry to be deleted exists
            await testGet(entryCode);

            const res = await request(app)
                .delete(`/entry/${entryCode}`)
                .set('Accept', 'application/json') // necessary?
                .expect(200);

            const { body } = res;
            expect(body).toBeDefined();

            expect(body.entryCode).toEqual(entryCode);

            // check that entry is gone
            await testGet(entryCode, 404);
        });

        test("Can't delete entry with invalid code", async () => {
            const entryCode = 'FaKeCoDe';
            const res = await request(app)
                .get(`/entry/${entryCode}`)
                .set('Accept', 'application/json')
                .expect(404);

            expect(res.body).toEqual({
                error: 'Entry not found',
            });
        });

        test("Can't delete non-existent entry", async () => {
            const entryId = 9001;
            const entryCode = hashids.encode(entryId);
            const res = await request(app)
                .get(`/entry/${entryCode}`)
                .set('Accept', 'application/json')
                .expect(404);

            expect(res.body).toEqual({
                error: 'Entry not found',
            });
        });
    });

    describe('Test entry edit', () => {
        test.skip('Can edit entry', async () => {
            // TODO
        });
    });
});
