import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { saveEntryEdit } from '../actions/entry';
import { getLists } from '../actions/list';
import { Entry, EntryList } from '../types';

export interface ListsState {
    [listCode: string]: EntryList;
}

const initialState: ListsState = {};

const updateListEntry = (list: EntryList, result: Entry) => ({
    ...list,
    entries: list.entries.map(
        (entry): Entry =>
            entry.entryCode === result.entryCode ? result : entry,
    ),
});

export const lists: Reducer<ListsState> = reducerWithInitialState(initialState)
    .case(saveEntryEdit.done, (state, { result }) => ({
        ...state,
        [result.listCode]: updateListEntry(state[result.listCode], result),
    }))
    .case(getLists.done, (state, { result }) => result);
