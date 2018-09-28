import * as express from 'express';

export const isLoggedIn: express.RequestHandler = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // TODO: Consider refactor so route not exposed here
    return res.redirect('/login');
};
