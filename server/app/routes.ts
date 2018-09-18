import * as express from 'express';
import * as path from 'path';

import passport, { isLoggedIn } from './helpers/auth';
import db from './helpers/db';

const router = express.Router();

router.get('/healthcheck/db', (req: any, res: any) => {
    db.query('select * from users;')
        .then(data => {
            console.log(JSON.stringify(data));
        })
        .catch(error => {
            res.send(`failed to retrieve data. ${error}`);
        });
});

router.get('/dashboard', isLoggedIn,
    (req: any, res: any) => {
        console.log('in dashboard');
        res.sendFile(path.resolve(`${__dirname}/../../web/build/index.html`));
    });

router.get('/profile', isLoggedIn,
    (req: any, res: any) => {
        console.log('in profile');
        console.log(JSON.stringify(req.user));
        const { id, username, image } = req.user;
        res.send(`id: ${id}, username: ${username}, image: ${image}`);
        // res.sendFile(path.resolve(`${__dirname}/../../web/build/profile.html`));
    });

router.route('/login')
    .get((req: any, res: any) => {
        res.sendFile(path.resolve(`${__dirname}/../../web/build/login.html`));
    })
    .post(passport.authenticate('local'),
        (req: any, res: any) => {
            console.log(JSON.stringify(req.user));
            res.redirect('/dashboard');
        });

// router.get('/api/getUsername', (req: any, res: any) => res.send({ username: os.userInfo().username }));

export default router;