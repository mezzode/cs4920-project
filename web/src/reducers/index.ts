import { combineReducers, Reducer } from 'redux';
import { displayedLists, DisplayedListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flashMessage, FlashMessageState } from './flashMessage';
import { search, SearchState } from './search';
import { user, UserState } from './user';

export interface State {
    displayedLists: DisplayedListsState;
    entryEditor: EntryEditorState;
    flashMessage: FlashMessageState;
    search: SearchState;
    user: UserState;
}

const reducers = {
    displayedLists,
    entryEditor,
    flashMessage,
    search,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
