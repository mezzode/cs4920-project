import { combineReducers } from 'redux';
import entryEditor, { IEntryEditorState } from './entryEditor';
import user, { UserState } from './user';

export interface State {
    entryEditor: IEntryEditorState;
    user: UserState;
}

const reducers = {
    entryEditor,
    user,
};

export default combineReducers(reducers);
