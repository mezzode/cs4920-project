import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearMedia, clearMedias, setMedia, setMedias } from '../actions/media';
import { SearchResultMedia } from '../views/SearchResult/types';

export interface MediaState {
    media: SearchResultMedia | null;
    medias: SearchResultMedia[];
    totalResults: number;
}

const initialState: MediaState = {
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
    }))
    .case(clearMedias, () => initialState)
    .build();
