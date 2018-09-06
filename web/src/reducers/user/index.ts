import { Action } from "../actions";
import { ActionType } from "../actions";

export interface IState {
    displayName: string|null;
}

const initialState: IState = {
    displayName: null,
}

export default function user(state: IState = initialState, action: Action) {
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
