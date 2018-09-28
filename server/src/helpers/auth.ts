import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { checkLogin, DB, getUserById } from './db';

export { passport };

interface User {
    id: number; // may have more properties...
}

export const setupAuth = (db: DB) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const { isValid, user } = await checkLogin(username, password);
            return isValid ? done(null, user) : done(null, isValid);
        }),
    );

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
        const user = await getUserById(id);
        done(null, user);
    });
};
