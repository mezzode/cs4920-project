import * as bcrypt from 'bcrypt';
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
const cn = `postgres://postgres@${process.env.HOST}:5433/appdb`;

interface Extensions {}

export const db: IDatabase<Extensions> & Extensions = pgp(cn);

export type DB = typeof db;

export const genHashedPassword = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const compareHashedPasswords = (passwordA: string, passwordB: string) =>
    bcrypt.compareSync(passwordA, passwordB);

export const getUserById = async (id: number) =>
    await db.oneOrNone({
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id],
    });

export const resetPassword = async (username: string, email: string) => {
    console.log(email);
    const user = await db.oneOrNone({
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username],
    });
    if (user.username) {
        await db.query(
            `UPDATE users SET password = 'defaultpass' WHERE username = '${username}'`,
        );
        return true;
    } else {
        return false;
    }
};
