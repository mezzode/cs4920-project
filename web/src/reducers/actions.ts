import { Action as ReduxAction, ActionCreator } from 'redux';

export enum ActionType {
    setUser = 'SET_USER',
    clearUser = 'CLEAR_USER',
}

export interface ISetUserAction extends ReduxAction<ActionType.setUser> {
    readonly displayName: string;
}

export interface IClearUserAction extends ReduxAction<ActionType.clearUser> { }

export type Action = ISetUserAction | IClearUserAction;

// action creators

export const createSetUserAction: ActionCreator<ISetUserAction> = (displayName: string) => ({ displayName, type: ActionType.setUser });
export const createClearUserAction: ActionCreator<IClearUserAction> = () => ({ type: ActionType.clearUser });
