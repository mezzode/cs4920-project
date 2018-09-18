import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export default passport;

export const isLoggedIn = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

export const setupAuth = (db: any) => {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            db.oneOrNone({
                text: 'select * from users where username = $1',
                values: [username]
            }).then((user: any) => {
                console.log(JSON.stringify(user));
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            }).catch((error: any) => {
                return done(error);
            });
        }
    ));

    passport.serializeUser(function (user: any, done) {
        done(null, user);
        // done(null, user.id);
    });

    passport.deserializeUser(function (user, done) { // function (id,done)
        done(null, user);
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });
};
