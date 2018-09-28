import * as express from 'express';
import * as fs from 'fs';
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

router.get('/healthcheck/db', async (req, res) => {
    try {
        const data = healthcheck();
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
    } catch (e) {
        res.send(`failed to retrieve data. ${e}`);
    }
});

<<<<<<< HEAD
router.get('/profile', isLoggedIn, async (req: any, res: any) => {
    const { image } = await getProfile(req.user.username);
    res.sendFile(image);
});

router.post(
    '/login',
    multerParser.none(),
    passport.authenticate('local'),
    (req: any, res: any) => {
        const userData = {
            username: req.user.username,
        };
        console.log(JSON.stringify(req.user));
        res.cookie('user-id', req.user.id, { maxAge: 2592000000 }); // Expires in one month
        res.json(userData);
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

        const user = await signUp(username, password, email, filePath);
        if (user) {
            req.login(user, (err: any) => {
                if (!err) {
                    res.cookie('user-id', user.id, { maxAge: 2592000000 }); // Expires in one month
                    res.json({ username: user.username });
                }
            });
        }
    },
);

router.post('/reset-password', isLoggedIn, async (req: any, res: any) => {
    const { username, email } = req.user;
    const result = await resetPassword(username, email);
    res.send(result);
});

router.post(
    '/update-password',
    multerParser.none(),
    isLoggedIn,
    async (req: any, res: any) => {
        const { username } = req.user;
        const newPassword = req.body.password;
        await updatePassword(username, newPassword);
        res.send();
    },
);

router.post(
    '/update-profile-image',
    // should ideally be upload.none() => isLoggedIn => upload.single('profileImage')
    upload.single('profileImage'),
    isLoggedIn,
    async (req: any, res: any) => {
        const { username } = req.user;

        // Remove old image if one exists
        const originalImage = (await getProfile(username)).image;
        if (originalImage) {
            fs.unlink(originalImage, (err: NodeJS.ErrnoException) => {
                console.log(err);
            });
        }

        // Save new image
        const profileImage = req.file;
        const filePath = path.join(uploadRootPath, profileImage.filename);
        await updateProfileImage(username, filePath);
=======
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
>>>>>>> 906779b300be6cc3845c83d73f17a77259afd500

        const { image } = await getProfile(username);
        res.sendFile(image);
    },
);
