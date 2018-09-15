import { Reducer } from 'redux';
import { clearUser, setUser } from '../../actions/user';

export interface IUserState {
    displayName: string | null;
}

const initialState: IUserState = {
    displayName: null,
};

const user: Reducer<IUserState> = (state = initialState, action) => {
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
