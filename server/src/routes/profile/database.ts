import { db } from '../../helpers/database';
import { genHashedPassword } from '../../helpers/database-util/auth';

export const getProfile = async (username: string) =>
    await db.oneOrNone({
        text: 'SELECT image FROM users WHERE username = $1',
        values: [username],
    });

export const updatePassword = async (username: string, password: string) => {
    const hashedPassword = genHashedPassword(password);

    await db.query(
        `UPDATE users SET password = '${hashedPassword}' WHERE username = '${username}'`,
    );
};

export const updateProfileImage = async (
    username: string,
    profilePath: string,
) =>
    await db.query(
        `UPDATE users SET image = '${profilePath}' WHERE username = '${username}'`,
    );
