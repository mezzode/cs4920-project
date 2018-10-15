import { combineReducers, Reducer } from 'redux';
import { entryEditor, EntryEditorState } from './entryEditor';
import { flashMessage, FlashMessageState } from './flashMessage';
import { user, UserState } from './user';
export interface State {
    entryEditor: EntryEditorState;
    user: UserState;
    flashMessage: FlashMessageState;
}

const reducers = {
    entryEditor,
    flashMessage,
    user,
};

export const rootReducer: Reducer<State> = combineReducers(reducers);
