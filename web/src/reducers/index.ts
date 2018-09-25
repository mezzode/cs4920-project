import { combineReducers, Reducer } from 'redux';
import { displayedLists, DisplayedListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flash, FlashState } from './flash';
import { user, UserState } from './user';
export interface State {
    displayedLists: DisplayedListsState;
    entryEditor: EntryEditorState;
    user: UserState;
    flash: FlashState;
}

const reducers = {
    displayedLists,
    entryEditor,
    flash,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
