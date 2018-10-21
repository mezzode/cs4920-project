import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('USER');

export const setUser = actionCreator<{
    readonly displayName: string;
    readonly authToken: string;
}>('SET');
export const clearUser = actionCreator('CLEAR');

export const setImage = actionCreator<{ readonly displayImage: string }>(
    'SET_IMAGE',
);

export const clearAuthAttempts = actionCreator('CLEAR_AUTH');
export const incrementAuthAttempt = actionCreator('INCREMENT');
