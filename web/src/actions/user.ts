import { Action as ReduxAction, ActionCreator } from "redux";

export enum UserActionType {
    setUser = "SET_USER",
    clearUser = "CLEAR_USER"
}

export interface ISetUserAction extends ReduxAction<UserActionType.setUser> {
    readonly displayName: string;
}

export interface IClearUserAction extends ReduxAction<UserActionType.clearUser> {}

export type UserAction = ISetUserAction | IClearUserAction;

// action creators

export const createSetUserAction: ActionCreator<ISetUserAction> = (
    displayName: string
) => ({ displayName, type: UserActionType.setUser });
export const createClearUserAction: ActionCreator<IClearUserAction> = () => ({
    type: UserActionType.clearUser
});
