import * as bcrypt from 'bcrypt';
import { db } from '../database';

export const genHashedPassword = (password: string) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const compareHashedPasswords = (passwordA: string, passwordB: string) =>
    bcrypt.compareSync(passwordA, passwordB);

export const getUserById = async (id: number) =>
    await db.oneOrNone({
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id],
    });
