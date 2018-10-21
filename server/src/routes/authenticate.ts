import * as bcrypt from 'bcryptjs';
import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { db } from '../helpers/database';
import { authTokenSecret } from '../helpers/secrets';

interface User {
    username: string;
}

export const checkLogin = async (
    username: string,
    providedPassword: string,
): Promise<User | null> => {
    const { password, ...user } = await db.oneOrNone<
        User & { password: string }
    >({
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    });

    if (!user) {
        return null;
    }

    return (await bcrypt.compare(providedPassword, password)) ? user : null;
};

export const createAuthToken = ({ username }: User) => {
    const payload = {
        username,
    };

    if (authTokenSecret === undefined) {
        throw new Error('AUTH_TOKEN_SECRET is missing!');
    }

    // TODO: use private and public keys instead
    const authToken = jwt.sign(payload, authTokenSecret, {
        expiresIn: '30 days', // TODO: token refreshing
        // TODO: aud, iss, sub
    });
    // TODO: encrypt token. note that tokens are just base64 encoded, so
    // make sure not to store anything sensitive without encryption

    return authToken;
};

export const authenticateRouter = Router().post(
    '/authenticate',
    async (req, res) => {
        // check username and passowrd, if good then return jwt
        const { username, password } = req.body;
        const user = await checkLogin(username, password);
        if (user === null) {
            res.status(401).json({
                error: 'Invalid username or password.',
            });
            return;
        }

        const authToken = createAuthToken(user);

        res.json({
            authToken,
            username,
        });
    },
);
