import { combineReducers, Reducer } from 'redux';
import { entryEditor } from './entryEditor';
import { flashMessage } from './flashMessage';
import { modals } from './modals';
import { user } from './user';

export const rootReducer = combineReducers({
    entryEditor,
    flashMessage,
    modals,
    user,
});

type ReducerState<T> = T extends Reducer<infer S> ? S : never;
export type State = ReducerState<typeof rootReducer>;
