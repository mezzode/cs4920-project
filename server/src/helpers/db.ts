import { IDatabase, IMain } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise({});
// https://docs.docker.com/compose/networking/
// containers join their network using their name. our db container is named "postgres"
// containers on the network connect to each other using the container port, not the host port
// the host port is only used for accessing the container from the host
const cn = `postgres://postgres@${process.env.HOST}/appdb`;
export const db: IDatabase<any> = pgp(cn);
