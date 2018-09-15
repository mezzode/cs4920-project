import { Reducer } from 'redux';
import { clearUser, setUser } from '../../actions/user';

export interface UserState {
    displayName: string | null;
}

const initialState: UserState = {
    displayName: null,
};

const user: Reducer<UserState> = (state = initialState, action) => {
    if (setUser.match(action)) {
        return {
            ...state,
            ...action.payload,
        };
    }
    if (clearUser.match(action)) {
        return {
            ...state,
            displayName: null,
        };
    }
    return state;
};

export default user;
