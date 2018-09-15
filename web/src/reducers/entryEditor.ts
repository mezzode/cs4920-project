import { Reducer } from "redux";
import { isType } from "typescript-fsa";
import { cancelEntryEdit, saveEntryEdit, startEntryEdit, updateEntryEdit } from "../actions/entry";
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

const entryEditor: Reducer<IEntryEditorState> = (
    state = initialState,
    action
) => {
    if (startEntryEdit.match(action)) {
        return {
            entry: { ...action.payload },
            status: Status.editing,
        };
    }

    if (isType(action, updateEntryEdit)) {
        if (state.entry === null || state.status === Status.closed) {
            throw new Error("Trying to update editor while editor is not open");
        }
        return { entry: { ...state.entry, ...action.payload }, status: state.status };
    }

    if (saveEntryEdit.done.match(action) || cancelEntryEdit.match(action)) {
        return initialState;
    }

    return state;
};

export default entryEditor;
