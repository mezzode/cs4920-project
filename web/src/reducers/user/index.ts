import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    clearAuthAttempts,
    clearUser,
    incrementAuthAttempt,
    setImage,
    setUser,
} from '../../actions/user';

export interface UserState {
    authAttempt: number;
    authToken: string | null;
    displayImage: string | null;
    displayName: string | null;
}

const initialState: UserState = {
    authAttempt: 0,
    authToken: null,
    displayImage: null,
    displayName: null,
};

// TODO: add auth token

export const user: Reducer<UserState> = reducerWithInitialState(initialState)
    .case(setUser, (state, userData) => ({
        ...state,
        ...userData,
    }))
    .case(clearUser, () => ({
        ...initialState,
    }))
    .case(setImage, (state, userData) => ({
        ...state,
        ...userData,
    }))
    .case(incrementAuthAttempt, state => ({
        ...state,
        authAttempt: state.authAttempt + 1,
    }))
    .case(clearAuthAttempts, state => ({
        ...state,
        authAttempt: 0,
    }))
    .build();
