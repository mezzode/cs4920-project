import { RequestHandler } from 'express';

export const isLoggedIn: RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(403);
};
