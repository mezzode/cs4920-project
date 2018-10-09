import { db } from '../../helpers/database';

export const healthcheck = async () => await db.query('select * from users;');
