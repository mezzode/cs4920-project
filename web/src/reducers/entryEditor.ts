import { Action } from "./actions";
import { ActionType } from "./actions";
import { IEntry } from "../components/lists/List";

export type IEntryEditorState = IEntry | null;

const initialState: IEntryEditorState = null;

import { Reducer } from "redux";

const entryEditor: Reducer<IEntryEditorState, Action> = (
    state = initialState,
    action
) => {
    if (state === null) {
        switch (action.type) {
            case ActionType.startEntryEdit:
                return { ...action.entry };
            default:
                return state;
        }
    }

    switch (action.type) {
        case ActionType.updateEntryEdit:
            const s = {
                ...state,
                ...action.entryUpdate
            };
            return s;
        default:
            return state;
    }
};

export default entryEditor;
