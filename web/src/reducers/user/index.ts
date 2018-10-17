import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    clearAuthAttempts,
    clearUser,
    incrementAuthAttempt,
    setImage,
    setIsSignedUp,
    setUser,
} from '../../actions/user';

export interface UserState {
    authAttempt: number;
    displayImage: string | null;
    displayName: string | null;
    isSignedUp: boolean;
}

const initialState: UserState = {
    authAttempt: 0,
    displayImage: null,
    displayName: localStorage.getItem('displayName'),
    isSignedUp: false,
};

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
    .case(setIsSignedUp, (state, isSignedUpData) => ({
        ...state,
        ...isSignedUpData,
    }))
    .build();
