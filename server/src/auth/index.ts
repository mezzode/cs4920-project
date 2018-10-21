import * as bcrypt from 'bcryptjs';
import * as expressJwt from 'express-jwt';
import { authTokenSecret } from '../helpers/secrets';

if (authTokenSecret === undefined) {
    throw new Error('AUTH_TOKEN_SECRET is missing!');
}

// sets payload onto req.user if success
export const auth = expressJwt({
    secret: authTokenSecret,

    isRevoked: (req, payload, done) => {
        // TODO
        const revoked = false;
        return done(null, revoked);
    },
});

export const genHashedPassword = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
