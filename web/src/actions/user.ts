import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('USER');

export const setUser = actionCreator<{
    readonly displayName: string;
}>('SET');
export const clearUser = actionCreator('CLEAR');

export const setImage = actionCreator<{ readonly displayImage: any }>(
    'SET_IMAGE',
);

export const clearAuthAttempts = actionCreator('CLEAR_AUTH');
export const incrementAuthAttempt = actionCreator('INCREMENT');
export const setIsAuthenticated = actionCreator<{
    readonly isAuthenticated: boolean;
}>('AUTHORIZED');

export const setIsSignedUp = actionCreator<{ readonly isSignedUp: boolean }>(
    'SIGNED_UP',
);
