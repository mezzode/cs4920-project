import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { db } from '../../helpers/database';
import { HandlerError } from '../../helpers/error';
import { userListsRouter } from './lists';

export const userRouter = Router();
userRouter.use(
    '/:username',
    asyncHandler(async (req, res, next) => {
        const { username } = req.params;
        const user = await db.oneOrNone<{ id: number }>(
            'SELECT id FROM users WHERE username = $(username)',
            { username },
        );
        if (!user) {
            throw new HandlerError('User not found', 404);
        }
        res.locals.userId = user.id;
        next();
    }),
    userListsRouter,
);
