import * as bodyParser from 'body-parser';
import flash = require('connect-flash');
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';

import { passport, setupAuth } from './helpers/auth';
import { db } from './helpers/db';
import { router } from './routes';

const app = express();

app.use(express.static('web/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

setupAuth(db);
app.use('/', router);

app.listen(8080, () => console.log('Server is listening on port 8080'));
