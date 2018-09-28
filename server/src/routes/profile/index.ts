import * as express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';

import { isLoggedIn } from '../../helpers/authentication';
import { upload, uploadRootPath } from '../../helpers/upload';
import { getProfile, updatePassword, updateProfileImage } from './database';

const router = express.Router();
const multerParser = multer();

router.get('/profile', isLoggedIn, async (req, res) => {
    const { image } = await getProfile(req.user.username);
    res.sendFile(image);
});

router.post(
    '/update-password',
    multerParser.none(),
    isLoggedIn,
    async (req, res) => {
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
    async (req, res) => {
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

        // Send new image
        const { image } = await getProfile(username);
        res.sendFile(image);
    },
);
