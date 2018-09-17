import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { saveEntryEdit } from '../actions/entry';
import { getDisplayedList } from '../actions/list';
import { Entry, EntryList } from '../types';

export interface DisplayedListsState {
    [listId: string]: EntryList;
}

const initialState: DisplayedListsState = {};

const displayedList = (list: EntryList, result: Entry) => ({
    ...list,
    entries: list.entries.map(
        entry => (entry.entryId === result.entryId ? result : entry),
    ),
});

export const displayedLists: Reducer<
    DisplayedListsState
> = reducerWithInitialState(initialState)
    .case(saveEntryEdit.done, (state, { result }) => ({
        ...state,
        [result.listId]: displayedList(state[result.listId], result), // update edited entry
    }))
    .case(getDisplayedList.done, (state, { result }) => ({
        [result.id]: result,
    }));
