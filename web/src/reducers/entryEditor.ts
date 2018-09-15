import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    cancelEntryEdit,
    saveEntryEdit,
    startEntryEdit,
    updateEntryEdit,
} from '../actions/entry';
import { Entry } from '../types';

export type EntryEditorState = EditingState | ClosedState;

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

export const entryEditor: Reducer<EntryEditorState> = reducerWithInitialState<
    EntryEditorState
>(initialState)
    .case(startEntryEdit, (state, entry) => ({
        entry,
        status: Status.editing,
    }))
    .case(updateEntryEdit, (state, entryUpdate) => {
        if (state.entry === null || state.status === Status.closed) {
            throw new Error('Trying to update editor while editor is not open');
        }
        return {
            entry: { ...state.entry, ...entryUpdate },
            status: state.status,
        };
    })
    .cases([saveEntryEdit.done, cancelEntryEdit], () => initialState)
    .build();
