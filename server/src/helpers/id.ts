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

const defaultFields = ['Entry', 'Media', 'List'];

/**
 * Replaces codes with ids in a given object.
 */
const mapCodesToIds = (obj: object, fields = defaultFields) =>
    fields.reduce((newObj, field) => {
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

/**
 * Replaces ids with codes in a given object.
 */
export const idsToCodes = (obj: object, fields = defaultFields) =>
    fields.reduce((newObj, field) => {
        const fieldLower = field.toLowerCase();
        const fieldId = `${fieldLower}Id`;
        if (!(fieldId in newObj)) {
            return newObj;
        }
        const code = hashids.encode(newObj[fieldId]);
        delete newObj[fieldId];
        newObj[`${fieldLower}Code`] = code;
        return newObj;
    }, obj);
