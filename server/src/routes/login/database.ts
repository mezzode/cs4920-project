import { db } from '../../helpers/database';
import { compareHashedPasswords } from '../../helpers/database-util/auth';

export const checkLogin = async (username: string, password: string) => {
    const user = await db.oneOrNone({
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    });
    console.log(JSON.stringify(user));
    if (!user) {
        return { isValid: false };
    }
    return {
        isValid: compareHashedPasswords(password, user.password),
        user,
    };
};

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
