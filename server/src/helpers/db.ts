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
export const db: IDatabase<any> = pgp(cn);

const getHashedPassword = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const healthcheck = async () => await db.query('select * from users;');

export const signUp = async (
    username: string,
    password: string,
    email: string,
    profilePath: string,
) => {
    const hashedPassword = getHashedPassword(password);
    const separator = ',';
    const includeEmail = `${separator} '${email}'`;
    const includeProfilePath = profilePath
        ? `${separator} '${profilePath}'`
        : '';
    const user = await db.oneOrNone({
        text: 'SELECT 1 FROM users WHERE username = $1',
        values: [username],
    });
    if (!user) {
        await db.query(
            `INSERT INTO users VALUES (DEFAULT, '${username}', '${hashedPassword}'` +
                `${includeEmail}${includeProfilePath});`,
        );
    }
};

export const checkLogin: any = async (username: string, password: string) => {
    const user = await db.oneOrNone({
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    });
    console.log(JSON.stringify(user));
    if (!user) {
        return { isValid: false };
    }
    return {
        isValid: bcrypt.compareSync(password, user.password),
        user,
    };
};

export const getProfile = async (username: string) =>
    await db.oneOrNone({
        text: 'SELECT username, image FROM users WHERE username = $1',
        values: [username],
    });

export const resetPassword = async (username: string, email: string) => {
    console.log(email);
    const user = await db.oneOrNone({
        text: 'SELECT 1 FROM users WHERE username = $1',
        values: [username],
    });
    if (user) {
        await db.query(
            `UPDATE users SET password = 'defaultpass' WHERE username = '${username}'`,
        );
        return true;
    } else {
        return false;
    }
};

export const updatePassword = async (username: string, password: string) => {
    const hashedPassword = getHashedPassword(password);

    await db.query(
        `UPDATE users SET password = '${hashedPassword}' WHERE username = '${username}'`,
    );
};

export const updateProfileImage = async (
    username: string,
    profileImage: File,
) =>
    await db.query(
        `UPDATE users SET image = ${profileImage} WHERE username = '${username}'`,
    );
