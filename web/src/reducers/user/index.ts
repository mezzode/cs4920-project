import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearUser, setUser } from '../../actions/user';

export interface UserState {
    displayImage: any | null;
    displayName: string | null;
}

const initialState: UserState = {
    displayImage: null,
    displayName: null,
};

export const user: Reducer<UserState> = reducerWithInitialState(initialState)
    .case(setUser, (state, userData) => ({ ...state, ...userData }))
    .case(clearUser, state => ({
        ...state,
        displayImage: null,
        displayName: null,
    }))
    .build();
