import * as express from 'express';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp:IMain = pgPromise({});
const cn = {
    database: 'appdb',
    user: 'postgres',
    host: 'postgres',
    port: 5432
};
const db:IDatabase<any> = pgp(cn);

const app = express();

app.use(express.static('web/build'));
// app.get('/api/getUsername', (req: any, res: any) => res.send({ username: os.userInfo().username }));
app.get('/healthcheck/db', (req: any, res: any) => {
    db.query('select * from users;')
        .then(data => {
            console.log(data);
            res.send('i am here ' + data);
        })
        .catch(error => {
            res.send(`failed to retrieve data. ${error}`);
        });
});
app.listen(8080, () => console.log('Server is listening on port 8080'));
