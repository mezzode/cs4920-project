import { IDatabase, IMain } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise({});
// const cn = {
//     database: 'appdb',
//     user: 'postgres',
//     host: 'postgres',
//     port: 5433
// };
// https://docs.docker.com/compose/networking/
// containers join their network using their name. our db container is named "postgres"
// containers on the network connect to each other using the container port, not the host port
// the host port is only used for accessing the container from the host
const cn = 'postgres://postgres@localhost:5433/appdb';

interface Extensions {}

export const db: IDatabase<Extensions> & Extensions = pgp(cn);

export type DB = typeof db;
