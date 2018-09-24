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

router.get('/dashboard', isLoggedIn, (req: any, res: any) => {
    console.log('in dashboard');
});

router.get('/profile', isLoggedIn, async (req: any, res: any) => {
    console.log('in profile');
    console.log(JSON.stringify(req.user));

    const { username, image } = await getProfile(req.user.username);
    const user = {
        image,
        username,
    };
    res.send(JSON.stringify(user));
});

router.post('/login', passport.authenticate('local'), (req: any, res: any) => {
    console.log(JSON.stringify(req.user));
    res.redirect('/profile');
});

router.get('/logout', (req: any, res: any) => {
    req.logout();
    res.redirect('/');
});

const uploadRootPath = path.resolve(__dirname, '../../database/uploads');
const upload = multer({ dest: uploadRootPath });
router.post(
    '/sign-up',
    upload.single('profileImage'),
    async (req: any, res: any) => {
        const { username, password, email } = req.body;
        const profileImage = req.file;
        const filePath = path.join(uploadRootPath, profileImage.filename);

        await signUp(username, password, email, filePath);
        // req.login();
        res.redirect('/profile');
    },
);

router.post('/reset-password', async (req: any, res: any) => {
    const { username, email } = req.body;
    await resetPassword(username, email);
    res.send('Successfully reset password');
});

router.post('/update-password', async (req: any, res: any) => {
    const { username, password } = req.body;
    try {
        await updatePassword(username, password);
        res.send('Succesfully updated password');
    } catch (e) {
        res.send('Failed to update password');
    }
    console.log('ok');
});

router.get('/update-profile-image', async (req: any, res: any) => {
    const { username, profileImage } = req.body;
    try {
        await updateProfileImage(username, profileImage);
        res.send('Successfully updated profile image');
    } catch (e) {
        res.send('Failed to update profile image');
    }
    console.log('ok');
});
