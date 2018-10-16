import { combineReducers } from 'redux';
import { entryEditor } from 'src/components/modals/entries/EntryEditor/reducer';
import { listDeleter } from 'src/components/modals/lists/ListDeleter/reducer';
import { listEditor } from 'src/components/modals/lists/ListEditor/reducer';

export const modals = combineReducers({
    entryEditor,
    listDeleter,
    listEditor,
});
