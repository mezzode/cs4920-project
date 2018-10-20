import actionCreatorFactory from 'typescript-fsa';
import { SearchResultMedia } from '../views/SearchResult/types';

const actionCreator = actionCreatorFactory('MEDIA_SEARCH');

export const setMediaSearchResult = actionCreator<SearchResultMedia>('SET');
export const clearMediaSearchResult = actionCreator('CLEAR');

export const setMediaSearchResults = actionCreator<{
    readonly medias: SearchResultMedia[];
    readonly totalResults: number;
}>('SETS');
export const clearMediaSearchResults = actionCreator('CLEARS');

export const setLoading = actionCreator('LOADING');
