import { RequestHandler } from 'express';
import { Router } from 'express';
import { DateTime } from 'luxon';
import { db } from '../helpers/db';
import { hashids } from '../id';
import { Entry } from './types';

const getEntry: RequestHandler = async (req, res) => {
    try {
        const { code } = req.params;
        const [id] = hashids.decode(code);
        if (!id) {
            res.status(400).json({
                error: 'Invalid ID',
            });
            return;
        }
        const entry: Entry = await db.oneOrNone(
            'SELECT * FROM entries e WHERE e.id = $(id)',
            { id },
        );
        // TODO: add media data to entry
        res.send(entry);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: 'Something went wrong',
        });
    }
};

const newEntry: RequestHandler = async (req, res) => {
    const entry: Entry = req.body.entry;
    const insertedEntry = await db.one(
        `INSERT INTO entries($(entry:name)) VALUES ($(entry)) RETURNING *`,
        { entry },
    );
    res.json(insertedEntry);
};

const validateEntry = (entry: Entry): boolean => {
    try {
        return (
            DateTime.fromISO(entry.started).isValid &&
            DateTime.fromISO(entry.finished).isValid
        );
    } catch (e) {
        return false;
    }
};

const updateEntry: RequestHandler = async (req, res) => {
    try {
        const { code } = req.params;
        // TODO: authorisation. check that the user actually owns the entry.
        const entry: Entry = req.body.entry;
        if (!validateEntry(entry)) {
            res.status(400).json({
                error: 'Invalid entry',
            });
            return;
        }
        const [id] = hashids.decode(code);
        const insertedEntry: Entry = await db.one(
            `UPDATE entries SET ($(entry:name)) = ($(entry))
            WHERE id = $(id) RETURNING *`,
            { entry, id },
        );
        res.json(insertedEntry);
    } catch (e) {
        console.error(e);
        res.status(400).json({
            error: 'Something went wrong.',
        });
    }
};

// TODO: consider creating middleware for checking authorisation instead of doing in each handler

export const entryRouter = Router();
entryRouter
    .route('/entry/:code')
    .get(getEntry)
    .post(updateEntry);
entryRouter.post('/entry', newEntry);
