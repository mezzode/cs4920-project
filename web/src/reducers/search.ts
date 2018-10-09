import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearSearch, setSearch } from '../actions/search';

export interface SearchState {
    search: string;
}

const initialState: SearchState = {
    search: '',
};

export const search: Reducer<SearchState> = reducerWithInitialState(
    initialState,
)
    .case(setSearch, (state, searchData) => ({
        ...state,
        ...searchData,
    }))
    .case(clearSearch, () => initialState)
    .build();
