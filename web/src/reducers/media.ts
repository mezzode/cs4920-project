import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { clearMedia, setMedia } from '../actions/media';
import { SearchResultMedia } from '../views/SearchResult/types';

export interface MediaState {
    media: SearchResultMedia | null;
}

const initialState: MediaState = {
    media: null,
};

export const media: Reducer<MediaState> = reducerWithInitialState(initialState)
    .case(setMedia, (state, mediaData) => ({
        ...state,
        ...mediaData,
    }))
    .case(clearMedia, () => initialState)
    .build();
