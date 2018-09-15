import { Action as ReduxAction } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { IEntry } from "../types";

enum ActionType {
    startEntryEdit = "START_ENTRY_EDIT",
    cancelEntryEdit = "CANCEL_ENTRY_EDIT",
    saveEntryEdit = "SAVE_ENTRY_EDIT",
    updateEntryEdit = "UPDATE_ENTRY_EDIT"
}

export type IEntryUpdate = { readonly [field in keyof IEntry]?: IEntry[field] };

export interface IUpdateEntryEditAction
    extends ReduxAction<ActionType.updateEntryEdit> {
    readonly entryUpdate: IEntryUpdate;
}

export interface IStartEntryEditAction
    extends ReduxAction<ActionType.startEntryEdit> {
    readonly entry: IEntry;
}

export interface ICancelEntryEditAction extends ReduxAction<ActionType.cancelEntryEdit> { }

const actionCreator = actionCreatorFactory();

export const createUpdateEntryEditAction = actionCreator<IEntryUpdate>(ActionType.updateEntryEdit);

type payload = void;
interface ISuccess extends IEntry {}
type error = string;

export const saveEntryEdit = actionCreator.async<payload, ISuccess, error>(
    ActionType.saveEntryEdit
);
