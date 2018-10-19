import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    clearMediaSearchResult,
    clearMediaSearchResults,
    setLoading,
    setMediaSearchResult,
    setMediaSearchResults,
} from '../actions/mediaSearch';
import { SearchResultMedia } from '../views/SearchResult/types';

export interface MediaSearchState {
    isLoading: boolean;
    media: SearchResultMedia | null;
    medias: SearchResultMedia[];
    totalResults: number;
}

const initialState: MediaSearchState = {
    isLoading: false,
    media: null,
    medias: [],
    totalResults: 0,
};

export const mediaSearch: Reducer<MediaSearchState> = reducerWithInitialState(
    initialState,
)
    .case(setMediaSearchResult, (state, mediaData) => ({
        ...state,
        ...mediaData,
    }))
    .case(clearMediaSearchResult, () => initialState)
    .case(setMediaSearchResults, (state, mediaData) => ({
        ...state,
        ...mediaData,
        isLoading: false,
    }))
    .case(clearMediaSearchResults, state => ({
        ...state,
        isLoading: false,
        medias: [],
    }))
    .case(setLoading, state => ({
        ...state,
        isLoading: true,
    }))
    .build();
