import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise({});
// const cn = {
//     database: 'appdb',
//     user: 'postgres',
//     host: 'postgres',
//     port: 5433
// };
const cn = 'postgres://postgres@localhost:5433/appdb';
const db: IDatabase<any> = pgp(cn);

export default db;