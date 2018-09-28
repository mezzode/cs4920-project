import { db, genHashedPassword } from '../../helpers/database';

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
    if (!user) {
        const hashedPassword = genHashedPassword(password);

        const separator = ',';
        const includeEmail = `${separator} '${email}'`;
        const includeProfilePath = profilePath
            ? `${separator} '${profilePath}'`
            : '';

        await db.query(
            `INSERT INTO users VALUES (DEFAULT, '${username}', '${hashedPassword}'` +
                `${includeEmail}${includeProfilePath});`,
        );
        return await db.oneOrNone({
            text: 'SELECT * FROM users WHERE username = $1',
            values: [username],
        });
    }
    return user;
};
