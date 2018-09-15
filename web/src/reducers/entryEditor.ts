import { Reducer } from "redux";
import { isType } from "typescript-fsa";
import { Action, ActionType } from "../actions";
import { createUpdateEntryEditAction, saveEntryEdit } from "../actions/entry";
import { IEntry } from "../types";

export type IEntryEditorState = IEditingState | IClosedState;

enum Status {
    editing,
    saving,
    closed,
}

interface IEditingState {
    entry: IEntry;
    status: Status.editing | Status.saving;
}

interface IClosedState {
    entry: null;
    status: Status.closed;
}

const initialState: IClosedState = {
    entry: null,
    status: Status.closed,
}

const entryEditor: Reducer<IEntryEditorState, Action> = (
    state = initialState,
    action
) => {
    if (isType(action, createUpdateEntryEditAction)) {
        if (state.entry === null || state.status === Status.closed) {
            throw new Error("Trying to update editor while editor is not open");
        }
        return { entry: { ...state.entry, ...action.entryUpdate }, status: state.status };
    }

    switch (action.type) {
        case ActionType.startEntryEdit:
            return {
                entry: {...action.entry},
                status: Status.editing,
            };
        // case ActionType.updateEntryEdit:
        case createUpdateEntryEditAction.mat:
            if (state.entry === null || state.status === Status.closed) {
                throw new Error(
                    "Trying to update editor while editor is not open"
                );
            }
            return {
                entry: {...state.entry, ...action.entryUpdate },
                status: state.status,
            };
        case saveEntryEdit.done.type:
        case ActionType.cancelEntryEdit:
            return initialState;
        default:
            return state;
    }
};

export default entryEditor;
