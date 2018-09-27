import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { actionCreatorFactory } from 'typescript-fsa';
import { State } from '../reducers/index';

const actionCreator = actionCreatorFactory('USER');

export const setUser = actionCreator<{
    readonly displayImage: any;
    readonly displayName: string;
}>('SET');
export const clearUser = actionCreator('CLEAR');

export const clearAuthAttempts = actionCreator('CLEAR_AUTH');
export const incrementAuthAttempt = actionCreator('INCREMENT');
export const setIsAuthenticated = actionCreator<{
    readonly isAuthenticated: boolean;
}>('AUTHORIZED');

export const setIsSignedUp = actionCreator<{ readonly isSignedUp: boolean }>(
    'SIGNED_UP',
);

export const loadUser = () => () => async dispatch => {
    // dispatch(getUser.started());
    try {
        const res = await fetch('/profile');
        if (res.status > 400) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const result = await res.json();
        dispatch(setUser(result));
        return res;
    } catch (e) {
        // dispatch(getUser.failed(e.message));
        throw e;
    }
};
