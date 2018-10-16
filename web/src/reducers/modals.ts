import { combineReducers } from 'redux';
import { listDeleter } from 'src/components/lists/ListDeleter/reducer';
import { listEditor } from 'src/components/lists/ListEditor/reducer';

export const modals = combineReducers({
    listDeleter,
    listEditor,
});
