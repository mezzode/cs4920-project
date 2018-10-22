import { Express } from 'express';
import { router as apiRouter } from './api';
import { authenticateRouter } from './authenticate';
import { router as healthcheckRouter } from './healthcheck';
import { entryRouter } from './lists/entries';
import { listRouter } from './lists/lists';
// import { router as loginRouter } from './login';
import { router as profileRouter } from './profile';
import { router as signupRouter } from './signup';
import { userRouter } from './user/index';

export const setupRoutes = (app: Express) => {
    app.use(healthcheckRouter);
    // app.use(loginRouter);
    app.use(authenticateRouter);
    app.use(profileRouter);
    app.use(signupRouter);
    app.use('/entry', entryRouter);
    app.use('/list', listRouter);
    app.use(apiRouter);
    app.use('/user', userRouter);
};
