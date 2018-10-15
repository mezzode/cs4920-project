import * as bodyParser from 'body-parser';
import flash = require('connect-flash');
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';

import { errorHandler } from './helpers/error';
import { setupRoutes } from './routes';
import { setupAuth } from './routes/login/setup-authentication';

export const app = express();

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
); // TODO: configure cors
app.use(express.static('web/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

setupAuth();
setupRoutes(app);
app.use(errorHandler);
