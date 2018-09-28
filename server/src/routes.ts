import * as express from 'express';
import * as path from 'path';

import { isLoggedIn, passport } from './helpers/auth';
import { db } from './helpers/db';

export const router = express.Router();

router.get('/healthcheck/db', async (req, res) => {
    try {
        const data = await db.query('select * from users;');
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
    } catch (e) {
        res.send(`failed to retrieve data. ${e}`);
    }
});

router.get('/dashboard', isLoggedIn, (req, res) => {
    console.log('in dashboard');
    res.sendFile(path.resolve(`${__dirname}/../../web/build/index.html`));
});

router.get('/profile', isLoggedIn, (req, res) => {
    console.log('in profile');
    console.log(JSON.stringify(req.user));
    const { id, username, image } = req.user;
    res.send(`id: ${id}, username: ${username}, image: ${image}`);
    // res.sendFile(path.resolve(`${__dirname}/../../web/build/profile.html`));
});

router
    .route('/login')
    .get((req, res) => {
        res.sendFile(path.resolve(`${__dirname}/../../web/build/login.html`));
    })
    .post(passport.authenticate('local'), (req, res) => {
        console.log(JSON.stringify(req.user));
        res.redirect('/dashboard');
    });

// router.get('/api/getUsername', (req: any, res: any) => res.send({ username: os.userInfo().username }));
