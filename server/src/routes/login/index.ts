import * as express from 'express';
import * as multer from 'multer';
import * as passport from 'passport';

import { isLoggedIn } from '../../helpers/authentication';
import { resetPassword } from '../../helpers/database';

const router = express.Router();
const multerParser = multer();

router.post(
    '/login',
    multerParser.none(),
    passport.authenticate('local'),
    (req, res) => {
        const userData = {
            username: req.user.username,
        };
        console.log(JSON.stringify(req.user));
        res.cookie('user-id', req.user.id, { maxAge: 2592000000 }); // Expires in one month
        res.json(userData);
    },
);

router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('user-id');
    res.send();
});

router.post('/reset-password', isLoggedIn, async (req, res) => {
    const { username, email } = req.user;
    const result = await resetPassword(username, email);
    res.send(result);
});
