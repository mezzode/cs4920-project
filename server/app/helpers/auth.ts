import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IDatabase } from 'pg-promise';
import { RequestHandler } from 'express';

export default passport;

export const isLoggedIn: RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

export const setupAuth = (db: IDatabase<any>) => {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await db.oneOrNone({
                    text: 'select * from users where username = $1',
                    values: [username]
                });
                console.log(JSON.stringify(user));
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            } catch (e) {
                return done(e);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
        // done(null, user.id);
    });

    passport.deserializeUser((user, done) => { // function (id,done)
        done(null, user);
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });
};
