import { RequestHandler } from 'express';
import Hashids from 'hashids';
import { HandlerError } from './error';

// TODO: store salt in env?
export const hashids = new Hashids('salt');

/**
 * Middleware that replaces codes with ids in req.params
 */
export const paramCodesToIds: RequestHandler = (req, res, next) => {
    if (!req.params) {
        next();
    }
    req.params = mapCodesToIds(req.params);
    next();
};

/**
 * Middleware that replaces codes with ids in req.body
 */
export const bodyCodesToIds: RequestHandler = (req, res, next) => {
    if (!req.body) {
        next();
    }
    req.body = mapCodesToIds(req.body);
    next();
};

/**
 * Replaces codes with ids in a given object.
 */
function mapCodesToIds(obj: object) {
    const fields = ['entry', 'media', 'list'];
    return fields.reduce((newObj, field) => {
        const fieldCode = `${field}Code`;
        if (!(fieldCode in newObj)) {
            return newObj;
        }
        const [id] = hashids.decode(newObj[fieldCode]);
        if (!id) {
            throw new HandlerError('Entry not found', 404);
        }
        delete newObj[fieldCode];
        newObj[`${field}Id`] = id;
        return newObj;
    }, obj);
}
