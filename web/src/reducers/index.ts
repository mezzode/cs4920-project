import { combineReducers } from "redux";
import entryEditor, { IEntryEditorState } from "./entryEditor";
import user, { IUserState } from "./user";

export interface IState {
    entryEditor: IEntryEditorState;
    user: IUserState;
}

const reducers = {
    entryEditor,
    user,
};

export default combineReducers(reducers);
