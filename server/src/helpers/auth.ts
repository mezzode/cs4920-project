import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IDatabase } from 'pg-promise';
import { checkLogin, getUserById } from './db';

export { passport };

export const setupAuth = (db: IDatabase<any>) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const { isValid, user } = await checkLogin(username, password);
            return isValid ? done(null, user) : done(null, isValid);
        }),
    );

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
        const user = await getUserById(id);
        done(null, user);
    });
};
