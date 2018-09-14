import { Action } from "../actions";
import { ActionType } from "../actions";
import { Reducer } from "redux";

export interface IUserState {
    displayName: string | null;
}

const initialState: IUserState = {
    displayName: null
};

const user: Reducer<IUserState, Action> = (
    state: IUserState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionType.setUser:
            return {
                ...state,
                displayName: action.displayName
            };
        case ActionType.clearUser:
            return {
                ...state,
                displayName: null
            };
        default:
            return state;
    }
};

export default user;
