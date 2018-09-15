import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';
import {
    cancelEntryEdit,
    saveEntryEdit,
    startEntryEdit,
    updateEntryEdit,
} from '../actions/entry';
import { Entry } from '../types';

export type IEntryEditorState = EditingState | ClosedState;

enum Status {
    editing,
    saving,
    closed,
}

interface EditingState {
    entry: Entry;
    status: Status.editing | Status.saving;
}

interface ClosedState {
    entry: null;
    status: Status.closed;
}

const initialState: ClosedState = {
    entry: null,
    status: Status.closed,
};

const entryEditor: Reducer<IEntryEditorState> = (
    state = initialState,
    action,
) => {
    if (startEntryEdit.match(action)) {
        return {
            entry: { ...action.payload },
            status: Status.editing,
        };
    }

    if (isType(action, updateEntryEdit)) {
        if (state.entry === null || state.status === Status.closed) {
            throw new Error('Trying to update editor while editor is not open');
        }
        return {
            entry: { ...state.entry, ...action.payload },
            status: state.status,
        };
    }

    if (saveEntryEdit.done.match(action) || cancelEntryEdit.match(action)) {
        return initialState;
    }

    return state;
};

export default entryEditor;
