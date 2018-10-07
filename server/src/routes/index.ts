import { Express } from 'express';
import { entryRouter } from '../lists/entries';
import { listRouter } from '../lists/lists';
import { router as healthcheckRouter } from './healthcheck';
import { router as loginRouter } from './login';
import { router as profileRouter } from './profile';
import { router as signupRouter } from './signup';

export const setupRoutes = (app: Express) => {
    app.use(healthcheckRouter);
    app.use(loginRouter);
    app.use(profileRouter);
    app.use(signupRouter);
    app.use(entryRouter);
    app.use(listRouter);
};
