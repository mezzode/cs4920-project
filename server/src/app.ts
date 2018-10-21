import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';

import { errorHandler } from './helpers/error';
import { setupRoutes } from './routes';

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
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));

setupRoutes(app);
app.use(errorHandler);
