import * as express from 'express';

import { healthcheck } from './database';

const router = express.Router();

router.get('/healthcheck/db', async (_, res) => {
    try {
        const data = await healthcheck();
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
    } catch (e) {
        res.send(`failed to retrieve data. ${e}`);
    }
});

export { router };
