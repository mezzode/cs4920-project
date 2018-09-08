import * as express from 'express';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp:IMain = pgPromise({});
const cn = {
    database: 'appdb'
};
const db:IDatabase<any> = pgp(cn);

const app = express();

app.use(express.static('web/build'));
// app.get('/api/getUsername', (req: any, res: any) => res.send({ username: os.userInfo().username }));
app.get('/healthcheck/db', (req: any, res: any) => {
    db.query('select column_name, data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS where table_name = \'media\';')
        .then(data => {
            res.send(data.value);
        })
        .catch(error => {
            res.send(`failed to retrieve data. ${error}`);
        });
});
app.listen(3000, () => console.log('Server is listening on port 3000'));
