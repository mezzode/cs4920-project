import * as request from 'supertest';
import { entries, seedTestData } from '../../../test/data';
import { app } from '../../app';
import { db } from '../../helpers/database';
import { hashids } from '../../helpers/id';

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
