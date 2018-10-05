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
    const fields = ['Entry', 'Media', 'List'];
    return fields.reduce((newObj, field) => {
        const fieldLower = field.toLowerCase();
        const fieldCode = `${fieldLower}Code`;
        if (!(fieldCode in newObj)) {
            return newObj;
        }
        const [id] = hashids.decode(newObj[fieldCode]);
        if (!id) {
            throw new HandlerError(`${field} not found`, 404);
        }
        delete newObj[fieldCode];
        newObj[`${fieldLower}Id`] = id;
        return newObj;
    }, obj);
}
