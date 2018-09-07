import { Action } from "../actions";
import { ActionType } from "../actions";

export interface IUserState {
    displayName: string | null;
}

const initialState: IUserState = {
    displayName: null
};

export default function user(state: IUserState = initialState, action: Action) {
    switch (action.type) {
        case ActionType.setUser:
            return {
                ...state,
                displayName: action.displayName,
            };
        case ActionType.clearUser:
            return {
                ...state,
                displayName: null,
            };
        default:
            return state;
    }
}
