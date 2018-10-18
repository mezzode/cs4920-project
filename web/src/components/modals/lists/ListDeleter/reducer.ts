import { Reducer } from 'redux';
import { EntryList } from 'src/types';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
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
