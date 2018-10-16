import { combineReducers, Reducer } from 'redux';
import { flashMessage } from './flashMessage';
import { modals } from './modals';
import { user } from './user';

export const rootReducer = combineReducers({
    flashMessage,
    modals,
    user,
});

type ReducerState<T> = T extends Reducer<infer S> ? S : never;
export type State = ReducerState<typeof rootReducer>;
