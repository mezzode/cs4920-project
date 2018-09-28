import { compareHashedPasswords, db } from '../../helpers/database';

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
