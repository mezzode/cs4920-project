import { Express } from 'express';
import { router as healthcheckRouter } from './healthcheck';
import { entryRouter } from './lists/entries';
import { listRouter } from './lists/lists';
import { router as loginRouter } from './login';
import { router as profileRouter } from './profile';
import { router as signupRouter } from './signup';
import { userRouter } from './user/index';

export const setupRoutes = (app: Express) => {
    app.use(healthcheckRouter);
    app.use(loginRouter);
    app.use(profileRouter);
    app.use(signupRouter);
    app.use(entryRouter);
    app.use(listRouter);
    app.use('/user', userRouter);
};
