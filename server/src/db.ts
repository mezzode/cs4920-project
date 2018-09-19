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
const cn = 'postgres://postgres@postgres:5432/appdb';

export const db: IDatabase<any> = pgp(cn);

export const healthcheck = async (req: any, res: any) => {
    try {
        const data = await db.query('select * from users;');
        console.log(JSON.stringify(data));
        res.send('i am here ' + data);
    } catch (e) {
        res.send(`failed to retrieve data. ${e}`);
    }
};
