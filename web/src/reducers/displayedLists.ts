import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { saveEntryEdit } from '../actions/entry';
import { clearDisplayedLists, getDisplayedList } from '../actions/list';
import { Entry, EntryList } from '../types';

export interface DisplayedListsState {
    [listCode: string]: EntryList;
}

const initialState: DisplayedListsState = {};

const displayedList = (list: EntryList, entryCode: string, result: Entry) => ({
    ...list,
    entries: list.entries.map(
        (entry): Entry => (entry.entryCode === entryCode ? result : entry),
    ),
});

export const displayedLists: Reducer<
    DisplayedListsState
> = reducerWithInitialState(initialState)
    .case(saveEntryEdit.done, (state, { result }) => ({
        ...state,
        [result.listCode]: displayedList(
            state[result.listCode],
            result.entryCode,
            result,
        ), // update edited entry
    }))
    .case(getDisplayedList.done, (state, { result }) => ({
        [result.listCode]: result,
    }))
    .case(clearDisplayedLists, state => initialState);
