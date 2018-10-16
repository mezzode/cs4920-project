import { combineReducers } from 'redux';
import { listDeleter } from 'src/components/lists/ListDeleter/reducer';

export const modals = combineReducers({
    listDeleter,
});
