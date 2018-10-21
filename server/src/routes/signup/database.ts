import { genHashedPassword } from '../../auth';
import { db } from '../../helpers/database';

export const signUp = async (
    username: string,
    password: string,
    email: string,
    profilePath: string,
) => {
    const user = await db.oneOrNone({
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    });
    if (user) {
        throw new Error('Username already taken');
    }
    const hashedPassword = genHashedPassword(password);

    const separator = ',';
    const includeEmail = `${separator} '${email}'`;
    const includeProfilePath = profilePath
        ? `${separator} '${profilePath}'`
        : '';

    return db.oneOrNone<{ username: string }>(
        `INSERT INTO users VALUES (DEFAULT, '${username}', '${hashedPassword}'` +
            `${includeEmail}${includeProfilePath}) RETURNING username;`,
    );
};
