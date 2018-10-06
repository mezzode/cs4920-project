import { combineReducers, Reducer } from 'redux';
import { displayedLists, DisplayedListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flashMessage, FlashMessageState } from './flashMessage';
import { user, UserState } from './user';
export interface State {
    displayedLists: DisplayedListsState;
    entryEditor: EntryEditorState;
    user: UserState;
    flashMessage: FlashMessageState;
}

const reducers = {
    displayedLists,
    entryEditor,
    flashMessage,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
