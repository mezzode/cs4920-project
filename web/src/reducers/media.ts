import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearMedia, clearMedias, setMedia, setMedias } from '../actions/media';
import { SearchResultMedia } from '../views/SearchResult/types';

export interface MediaState {
    media: SearchResultMedia | null;
    medias: SearchResultMedia[];
}

const initialState: MediaState = {
    media: null,
    medias: [],
};

export const media: Reducer<MediaState> = reducerWithInitialState(initialState)
    .case(setMedia || setMedias, (state, mediaData) => ({
        ...state,
        ...mediaData,
    }))
    .case(clearMedia || clearMedias, () => initialState)
    .build();
