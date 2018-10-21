import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof HandlerError) {
        res.status(err.status).json({
            error: err.message,
        });
    } else if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: 'Unauthorized',
        });
    } else {
        res.status(500).json({
            error: 'Something went wrong',
        });
    }
};

export class HandlerError extends Error {
    public name = 'HandlerError';

    constructor(public message: string, public status: number) {
        super(message);
        // Set the prototype manually since subclassing a builtin
        Object.setPrototypeOf(this, HandlerError.prototype);
    }
}
