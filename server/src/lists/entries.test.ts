import * as request from 'supertest';
import { app } from '../app';
import { db } from '../helpers/db';
import { hashids } from '../id';

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

        INSERT INTO entry(media_id, category, started, finished, list_id, last_updated)
        VALUES
            (1, 'Progress', '2016', '2018', 1, now()),
            (2, 'Complete', '2017-10-01', '2017-10-01', 1, now()),
            (1, 'Progress', '2017-10-01', '2017-10-01', 1, now()),
            (2, 'Complete', '2017-10', '2017-10-01', 1, now());`,
    );

describe('Test entries endpoints', () => {
    beforeEach(() => {
        return seedTestData();
    });

    afterAll(() => {
        // close db connection so script exits
        db.$pool.end();
    });

    test('Can create new entry', async () => {
        const entry = {
            category: 'Progress',
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
        const { entryCode } = body;
        expect(body).toBeDefined();

        const [entryId] = hashids.decode(entryCode);
        expect(entryId).toBeGreaterThan(0);

        // TODO: other expectations
    });
});
