import { combineReducers } from "redux";
import user from "./user";
import { IUserState } from "./user";

export interface IState {
    user: IUserState;
}

const reducers = {
    user,
};

export default combineReducers(reducers);
