import * as express from 'express';
import * as path from 'path';
import { upload, uploadRootPath } from '../../helpers/upload';
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
        if (user) {
            req.login(user, err => {
                if (!err) {
                    res.cookie('user-id', user.id, { maxAge: 2592000000 }); // Expires in one month
                    res.json({ username: user.username });
                }
            });
        }
    },
);

export { router };
