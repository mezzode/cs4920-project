import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    clearAuthAttempts,
    clearUser,
    incrementAuthAttempt,
    setImage,
    setIsAuthenticated,
    setIsSignedUp,
    setUser,
} from '../../actions/user';

export interface UserState {
    authAttempt: number;
    displayImage: string | null;
    displayName: string | null;
    isAuthenticated: boolean;
    isSignedUp: boolean;
}

const initialState: UserState = {
    authAttempt: 0,
    displayImage: null,
    displayName: null,
    isAuthenticated: false,
    isSignedUp: false,
};

export const user: Reducer<UserState> = reducerWithInitialState(initialState)
    .case(setUser, (state, userData) => ({
        ...state,
        ...userData,
        isAuthenticated: true,
    }))
    .case(clearUser, () => ({
        ...initialState,
    }))
    .case(setImage, (state, userData) => ({
        ...state,
        ...userData,
    }))
    .case(setIsAuthenticated, (state, isAuthData) => ({
        ...state,
        ...isAuthData,
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
