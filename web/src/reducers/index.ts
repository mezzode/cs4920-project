import { combineReducers, Reducer } from 'redux';
import { lists, ListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flashMessage, FlashMessageState } from './flashMessage';
import { user, UserState } from './user';
export interface State {
    lists: ListsState;
    entryEditor: EntryEditorState;
    user: UserState;
    flashMessage: FlashMessageState;
}

const reducers = {
    entryEditor,
    flashMessage,
    lists,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
