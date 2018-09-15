import { Action as ReduxAction } from "redux";
import actionCreatorFactory from "typescript-fsa";
import { IEntry } from "../types";

enum ActionType {
    startEntryEdit = "START_ENTRY_EDIT",
    cancelEntryEdit = "CANCEL_ENTRY_EDIT",
    saveEntryEdit = "SAVE_ENTRY_EDIT",
    updateEntryEdit = "UPDATE_ENTRY_EDIT"
}

type IEntryUpdate = { readonly [field in keyof IEntry]?: IEntry[field] };

export interface IUpdateEntryEditAction
    extends ReduxAction<ActionType.updateEntryEdit> {
    readonly entryUpdate: IEntryUpdate;
}

const actionCreator = actionCreatorFactory('ENTRY');

export const startEntryEdit = actionCreator<IEntry>(ActionType.startEntryEdit);
export const cancelEntryEdit = actionCreator(ActionType.cancelEntryEdit);
export const updateEntryEdit = actionCreator<IEntryUpdate>(ActionType.updateEntryEdit);

interface ISuccess extends IEntry {}
type error = string;

export const saveEntryEdit = actionCreator.async<void, ISuccess, error>(
    ActionType.saveEntryEdit
);
