import * as express from 'express';
import * as path from 'path';
import { upload, uploadRootPath } from '../../helpers/upload';
import { createAuthToken } from '../authenticate';
import { signUp } from './database';

const router = express.Router();

router.post(
    '/sign-up',
    // multerParser.none(), // not sure if this works
    upload.single('profileImage'),
    async (req, res) => {
        const { username, password, email } = req.body;
        const profileImage = req.file;
        const filePath = path.join(uploadRootPath, profileImage.filename);

        const user = await signUp(username, password, email, filePath);

        const authToken = createAuthToken(user);
        res.json({
            authToken,
            username,
        });
    },
);

export { router };
