import { combineReducers } from 'redux';
import { entryCreator } from 'src/components/modals/entries/EntryCreator/reducer';
import { entryEditor } from 'src/components/modals/entries/EntryEditor/reducer';
import { listDeleter } from 'src/components/modals/lists/ListDeleter/reducer';
import { listEditor } from 'src/components/modals/lists/ListEditor/reducer';

export const modals = combineReducers({
    entryCreator,
    entryEditor,
    listDeleter,
    listEditor,
});
