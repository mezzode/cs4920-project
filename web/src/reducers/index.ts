import { combineReducers, Reducer } from 'redux';
import { displayedLists, DisplayedListsState } from './displayedLists';
import { entryEditor, EntryEditorState } from './entryEditor';
import { user, UserState } from './user';

export interface State {
    displayedLists: DisplayedListsState;
    entryEditor: EntryEditorState;
    user: UserState;
}

const reducers = {
    displayedLists,
    entryEditor,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
