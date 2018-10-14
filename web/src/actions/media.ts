import actionCreatorFactory from 'typescript-fsa';
import { SearchResultMedia } from '../views/SearchResult/types';

const actionCreator = actionCreatorFactory('MEDIA');

export const setMedia = actionCreator<SearchResultMedia>('SET');
export const clearMedia = actionCreator('CLEAR');

export const setMedias = actionCreator<{
    readonly medias: SearchResultMedia[];
    readonly totalResults: number;
}>('SETS');
export const clearMedias = actionCreator('CLEARS');
