import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { EntryList } from '../../../types';
import { closeListDeleter, openListDeleter } from './actions';

interface ListDeleterState {
    list: EntryList | null;
}

const closed = {
    list: null,
};

export const listDeleter: Reducer<ListDeleterState> = reducerWithInitialState<
    ListDeleterState
>(closed)
    .case(openListDeleter, (state, list) => ({
        list,
    }))
    .case(closeListDeleter, () => closed)
    .build();
