import * as bodyParser from 'body-parser';
import flash = require('connect-flash');
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as path from 'path';
import { db, healthcheck } from './db';

const app = express();

app.use(express.static('web/build'));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const isLoggedIn = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};

app.get('/healthcheck/db', healthcheck);

app.get('/dashboard', isLoggedIn, (req: any, res: any) => {
    console.log('here1');
    res.sendFile(path.resolve(`${__dirname}/../../web/build/index.html`));
});

app.route('/login')
    .get((req: any, res: any) => {
        res.sendFile(path.resolve(`${__dirname}/../../web/build/login.html`));
    })
    .post(passport.authenticate('local'), (req: any, res: any) => {
        console.log(JSON.stringify(req.user));
        res.redirect('/dashboard');
    });

// app.get('/api/getUsername', (req: any, res: any) => res.send({ username: os.userInfo().username }));

app.listen(8080, () => console.log('Server is listening on port 8080'));

passport.use(
    new LocalStrategy((username, password, done) => {
        db.oneOrNone({
            text: 'select * from users where username = $1',
            values: [username],
        })
            .then(user => {
                console.log(JSON.stringify(user));
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username.',
                    });
                }
                if (user.password !== password) {
                    return done(null, false, {
                        message: 'Incorrect password.',
                    });
                }
                return done(null, user);
            })
            .catch(error => {
                return done(error);
            });
    }),
);

passport.serializeUser((user: any, done) => {
    done(null, user);
    // done(null, user.id);
});

passport.deserializeUser((user, done) => {
    // function (id,done)
    done(null, user);
    // User.findById(id, function (err, user) {
    //     done(err, user);
    // });
});
