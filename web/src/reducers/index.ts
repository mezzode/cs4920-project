import { combineReducers, Reducer } from 'redux';
import { lists, ListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flashMessage, FlashMessageState } from './flashMessage';
import { media, MediaState } from './media';
import { search, SearchState } from './search';
import { user, UserState } from './user';

export interface State {
    lists: ListsState;
    entryEditor: EntryEditorState;
    flashMessage: FlashMessageState;
    media: MediaState;
    search: SearchState;
    user: UserState;
}

const reducers = {
    entryEditor,
    flashMessage,
    lists,
    media,
    search,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
