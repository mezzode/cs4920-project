import * as request from 'supertest';
import { app } from '../app';
import { db } from '../helpers/db';

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

    describe('Test entry get', () => {
        test('Can get entry', async () => {
            const listCode = 'XG';
            const res = await testGet(listCode);

            // TODO: do this nicely
            expect(res.body).toBeDefined();
            expect(res.body.name).toEqual("mezzode's List");
        });
    });
});
