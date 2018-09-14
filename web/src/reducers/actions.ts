import { Action as ReduxAction, ActionCreator } from 'redux';
import { IEntry } from '../components/lists/List';

export enum ActionType {
    // user
    setUser = 'SET_USER',
    clearUser = 'CLEAR_USER',
    // entry
    startEntryEdit = 'START_ENTRY_EDIT',
    cancelEntryEdit = 'CANCEL_ENTRY_EDIT',
    saveEntryEdit = 'SAVE_ENTRY_EDIT',
    updateEntryEdit = 'UPDATE_ENTRY_EDIT',
}

export interface ISetUserAction extends ReduxAction<ActionType.setUser> {
    readonly displayName: string;
}

export interface IClearUserAction extends ReduxAction<ActionType.clearUser> {}

export type IEntryUpdate = { readonly [field in keyof IEntry]?: IEntry[field] };

export interface IUpdateEntryEditAction extends ReduxAction<ActionType.updateEntryEdit> {
    readonly entryUpdate: IEntryUpdate;
}

export interface IStartEntryEditAction extends ReduxAction<ActionType.startEntryEdit> {
    readonly entry: IEntry;
}

export type Action = ISetUserAction | IClearUserAction | IUpdateEntryEditAction | IStartEntryEditAction;

// action creators

export const createSetUserAction: ActionCreator<ISetUserAction> = (displayName: string) => ({ displayName, type: ActionType.setUser });
export const createClearUserAction: ActionCreator<IClearUserAction> = () => ({ type: ActionType.clearUser });

export const createUpdateEntryEditAction: ActionCreator<IUpdateEntryEditAction> = (entryUpdate: IEntryUpdate) => ({ type: ActionType.updateEntryEdit, entryUpdate });
