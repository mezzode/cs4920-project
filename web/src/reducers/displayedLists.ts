import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { saveEntryEdit } from '../actions/entry';
import { getLists } from '../actions/list';
import { Entry, EntryList, ListsMap } from '../types';

export type ListsState = ListsMap | null;

const updateListEntry = (list: EntryList, result: Entry) => ({
    ...list,
    entries: list.entries.map(
        (entry): Entry =>
            entry.entryCode === result.entryCode ? result : entry,
    ),
});

export const lists: Reducer<ListsState> = reducerWithInitialState<ListsState>(
    null,
)
    .case(
        saveEntryEdit.done,
        (state, { result }) =>
            state && {
                ...state,
                [result.listCode]: updateListEntry(
                    state[result.listCode],
                    result,
                ),
            },
    )
    .case(getLists.done, (state, { result }) => result)
    .case(getLists.started, state => null); // may not be a good idea
