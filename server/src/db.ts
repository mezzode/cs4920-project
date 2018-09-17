import { IDatabase, IMain } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise({});
// const cn = {
//     database: 'appdb',
//     user: 'postgres',
//     host: 'postgres',
//     port: 5433
// };
const cn = 'postgres://postgres@localhost:5433/appdb';

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
