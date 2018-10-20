import { DateTime } from 'luxon';
import * as request from 'supertest';
import { seedTestData } from '../../../test/data';
import { app } from '../../app';
import { db } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import { hashids } from '../../helpers/id';
import { Entry } from './types';

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
                finished: null,
                listCode: 'XG', // 1
                mediaCode: 'XG', // 1
                rating: 10,
                started: '2018',
                tags: [],
            };
            const res = await request(app)
                .post('/entry')
                .send(entry)
                .set('Accept', 'application/json')
                .expect(200);

            const { body } = res;
            expect(body).toBeDefined();

            const { entryCode } = body;
            const [entryId] = hashids.decode(entryCode);
            expect(entryId).toBeGreaterThan(0);
            expect(body).toEqual({ ...entry, entryCode });
        });

        test("Can't create entry for non-existent media", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entry = {
                category: 'In Progress',
                finished: null,
                listCode: 'XG', // 1
                mediaCode: 'BaDCoDe',
                rating: 10,
                started: '2018',
                tags: [],
            };

            const res = await request(app)
                .post('/entry')
                .send(entry)
                .set('Accept', 'application/json')
                .expect(404);

            const error = 'Media not found';

            const { body } = res;
            expect(body).toEqual({ error });

            expect(errSpy).toBeCalledWith(new HandlerError(error, 404));
            errSpy.mockRestore();
        });

        test("Can't create entry for non-existent list", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entry = {
                category: 'In Progress',
                finished: null,
                listCode: 'BadCoDe',
                mediaCode: 'XG', // 1
                rating: 10,
                started: '2018',
                tags: [],
            };

            const res = await request(app)
                .post('/entry')
                .send(entry)
                .set('Accept', 'application/json')
                .expect(404);

            const error = 'List not found';

            const { body } = res;
            expect(body).toEqual({ error });

            expect(errSpy).toBeCalledWith(new HandlerError(error, 404));
            errSpy.mockRestore();
        });

        test("Can't create entry with bad data", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entry = {
                category: 'In Progress',
                finished: 'This is not an ISO 8601 date',
                listCode: 'XG', // 1
                mediaCode: 'XG', // 1
                rating: 10,
                started: '2018-02-30',
                tags: [],
            };

            const res = await request(app)
                .post('/entry')
                .send(entry)
                .set('Accept', 'application/json')
                .expect(400);

            const error = 'Invalid entry';

            const { body } = res;
            expect(body).toEqual({ error });

            expect(errSpy).toBeCalledWith(new HandlerError(error, 404));
            errSpy.mockRestore();
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
                entryCode: 'XG',
                finished: '2018',
                listCode: 'XG',
                media: {
                    cover:
                        'https://78.media.tumblr.com/4f30940e947b58fb57e2b8499f460acb/tumblr_okccrbpkDY1rb48exo1_1280.jpg',
                    mediaCode: 'XG',
                    title: `Title of media ID 1`,
                },
                rating: 9,
                started: '2016',
                tags: [],
            });
        });

        test("Can't get entry with invalid code", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entryCode = 'FaKeCoDe';
            const res = await testGet(entryCode, 404);
            expect(res.body).toEqual({
                error: 'Entry not found',
            });

            expect(errSpy).toBeCalledWith(
                new HandlerError('Entry not found', 404),
            );
            errSpy.mockRestore();
        });

        test("Can't get non-existent entry", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entryId = 9001;
            const entryCode = hashids.encode(entryId);
            const res = await testGet(entryCode, 404);
            expect(res.body).toEqual({
                error: 'Entry not found',
            });

            expect(errSpy).toBeCalledWith(
                new HandlerError('Entry not found', 404),
            );
            errSpy.mockRestore();
        });
    });

    describe('Test entry delete', () => {
        test('Can delete entry', async () => {
            const entryCode = 'XG';

            // check that entry to be deleted exists
            await testGet(entryCode);

            const res = await request(app)
                .delete(`/entry/${entryCode}`)
                .set('Accept', 'application/json')
                .expect(200);

            const { body } = res;
            expect(body).toBeDefined();

            expect(body.entryCode).toEqual(entryCode);

            // check that entry is gone
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();
            await testGet(entryCode, 404);
            expect(errSpy).toBeCalledWith(
                new HandlerError('Entry not found', 404),
            );
            errSpy.mockRestore();
        });

        test("Can't delete entry with invalid code", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entryCode = 'FaKeCoDe';
            const res = await request(app)
                .get(`/entry/${entryCode}`)
                .set('Accept', 'application/json')
                .expect(404);

            expect(res.body).toEqual({
                error: 'Entry not found',
            });

            expect(errSpy).toBeCalledWith(
                new HandlerError('Entry not found', 404),
            );
            errSpy.mockRestore();
        });

        test("Can't delete non-existent entry", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entryId = 9001;
            const entryCode = hashids.encode(entryId);
            const res = await request(app)
                .get(`/entry/${entryCode}`)
                .set('Accept', 'application/json')
                .expect(404);

            expect(res.body).toEqual({
                error: 'Entry not found',
            });

            expect(errSpy).toBeCalledWith(
                new HandlerError('Entry not found', 404),
            );
            errSpy.mockRestore();
        });
    });

    describe('Test entry edit', () => {
        test('Can edit entry', async () => {
            const entryId = 1;
            const entryCode = hashids.encode(entryId);

            const { body } = await testGet(entryCode);
            const { lastUpdated: _, ...originalEntry } = body as Entry;

            expect(originalEntry.tags).toEqual([]);

            const {
                entryCode: __,
                listCode: ___,
                media,
                ...userFields
            } = originalEntry;

            const entryEdit = {
                ...userFields,
                rating: 5,
                started: '2010-02',
                tags: ['Favourites'],
            };

            const res = await request(app)
                .post(`/entry/${entryCode}`)
                .send(entryEdit)
                .set('Accept', 'application/json')
                .expect(200);

            const { lastUpdated, ...editedEntry } = res.body;
            expect(editedEntry).toEqual({ ...originalEntry, ...entryEdit });
            expect(DateTime.fromISO(lastUpdated).isValid).toBe(true);
            expect(editedEntry.tags).toEqual(['Favourites']);
        });

        test("Can't add duplicate tags", async () => {
            const errSpy = jest.spyOn(console, 'error');
            errSpy.mockImplementation();

            const entryId = 1;
            const entryCode = hashids.encode(entryId);

            const { body } = await testGet(entryCode);
            const {
                lastUpdated: _,
                entryCode: __,
                listCode: ___,
                media,
                ...originalEntry
            } = body as Entry;

            const entryEdit = {
                ...originalEntry,
                tags: ['Duplicate', 'Duplicate'],
            };

            const res = await request(app)
                .post(`/entry/${entryCode}`)
                .send(entryEdit)
                .set('Accept', 'application/json')
                .expect(400);

            const error = 'Invalid entry';

            expect(res.body).toEqual({ error });

            expect(errSpy).toBeCalledWith(new HandlerError(error, 404));
            errSpy.mockRestore();
        });
    });
});
