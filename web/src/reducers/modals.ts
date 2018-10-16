import { combineReducers } from 'redux';
import { listDeleter } from 'src/components/modals/lists/ListDeleter/reducer';
import { listEditor } from 'src/components/modals/lists/ListEditor/reducer';

export const modals = combineReducers({
    listDeleter,
    listEditor,
});
