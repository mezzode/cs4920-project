import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    clearMedia,
    clearMedias,
    setLoading,
    setMedia,
    setMedias,
} from '../actions/media';
import { SearchResultMedia } from '../views/SearchResult/types';

export interface MediaState {
    isLoading: boolean;
    media: SearchResultMedia | null;
    medias: SearchResultMedia[];
    totalResults: number;
}

const initialState: MediaState = {
    isLoading: false,
    media: null,
    medias: [],
    totalResults: 0,
};

export const media: Reducer<MediaState> = reducerWithInitialState(initialState)
    .case(setMedia, (state, mediaData) => ({
        ...state,
        ...mediaData,
    }))
    .case(clearMedia, () => initialState)
    .case(setMedias, (state, mediaData) => ({
        ...state,
        ...mediaData,
        isLoading: false,
    }))
    .case(clearMedias, state => ({
        ...state,
        isLoading: false,
        medias: [],
    }))
    .case(setLoading, state => ({
        ...state,
        isLoading: true,
    }))
    .build();
