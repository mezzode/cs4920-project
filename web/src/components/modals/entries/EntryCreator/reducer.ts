import { Reducer } from 'redux';
import { NewEntry } from 'src/types';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    addTagEntryCreator,
    closeEntryCreator,
    openEntryCreator,
    removeTagEntryCreator,
    saveEntryCreator,
} from './actions';

export type EntryCreatorState = EditingState | ClosedState;

export enum Status {
    editing,
    saving,
    closed,
}

interface EditingState {
    entry: NewEntry;
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

export const entryCreator: Reducer<EntryCreatorState> = reducerWithInitialState<
    EntryCreatorState
>(initialState)
    .case(openEntryCreator, (state, entry) => {
        return {
            ...state,
            entry,
            status: Status.editing,
        };
    })
    .case(saveEntryCreator, (state, entryUpdate) => {
        console.log('here');
        if (state.entry === null || state.status === Status.closed) {
            throw new Error('Trying to update editor while editor is not open');
        }
        console.log('here2');
        return {
            entry: { ...state.entry, ...entryUpdate },
            status: state.status,
        };
    })
    .case(closeEntryCreator, () => initialState)
    .case(addTagEntryCreator, (state, tag) => {
        console.log('here');
        if (state.entry === null || state.status === Status.closed) {
            throw new Error('Trying to update editor while editor is not open');
        }
        return {
            entry: {
                ...state.entry,
                tags: [...state.entry.tags, tag],
            },
            status: state.status,
        };
    })
    .case(removeTagEntryCreator, (state, tag) => {
        if (state.entry === null || state.status === Status.closed) {
            throw new Error('Trying to update editor while editor is not open');
        }
        return {
            entry: {
                ...state.entry,
                tags: state.entry.tags.filter(t => t !== tag),
            },
            status: state.status,
        };
    })
    .build();
