import { combineReducers, Reducer } from 'redux';
import { entryEditor, EntryEditorState } from './entryEditor';
import { user, UserState } from './user';

export interface State {
    entryEditor: EntryEditorState;
    user: UserState;
}

const reducers = {
    entryEditor,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
