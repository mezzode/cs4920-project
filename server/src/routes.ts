import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';

import { passport } from './helpers/auth';
import {
    getProfile,
    healthcheck,
    resetPassword,
    signUp,
    updatePassword,
    updateProfileImage,
} from './helpers/db';

const multerParser = multer();
export const router = express.Router();

const isLoggedIn: express.RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

router.get('/healthcheck/db', async (req: any, res: any) => {
    try {
        const data = healthcheck();
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
    } catch (e) {
        res.send(`failed to retrieve data. ${e}`);
    }
});

router.get('/profile', isLoggedIn, async (req: any, res: any) => {
    const { username, profileImagePath } = await getProfile(req.user.username);
    const user = {
        username,
    };
    res.send(user);
    res.sendFile(profileImagePath);
});

router.post(
    '/login',
    multerParser.none(),
    passport.authenticate('local'),
    (req: any, res: any) => {
        console.log(JSON.stringify(req.user));
        res.cookie('user-id', req.user.id, { maxAge: 2592000000 }); // Expires in one month
        res.send(JSON.stringify(req.user));
    },
);

router.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie('user-id');
    res.send();
});

const uploadRootPath = path.resolve(__dirname, '../../database/uploads');
const upload = multer({ dest: uploadRootPath });
router.post(
    '/sign-up',
    // multerParser.none(), // not sure if this works
    upload.single('profileImage'),
    async (req: any, res: any) => {
        const { username, password, email } = req.body;
        const profileImage = req.file;
        const filePath = path.join(uploadRootPath, profileImage.filename);

        await signUp(username, password, email, filePath);
        req.login();
    },
);

router.post('/reset-password', async (req: any, res: any) => {
    const { username, email } = req.body;
    const result = await resetPassword(username, email);
    res.send(result);
});

router.post('/update-password', async (req: any, res: any) => {
    const { username, password } = req.body;
    await updatePassword(username, password);
    res.send(true);
});

router.get('/update-profile-image', async (req: any, res: any) => {
    const { username, profileImage } = req.body;
    await updateProfileImage(username, profileImage);
    res.send(true);
});
