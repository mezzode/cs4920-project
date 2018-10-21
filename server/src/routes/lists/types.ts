import { Results } from '../api/types';

// TODO: share common types between web and server

/**
 * User-controlled entry data.
 * TODO: proper types
 */
export interface UserEntry {
    rating: number;
    started: string;
    finished: string;
    // progress: string;
    tags: string[];
    category: string;
}

/**
 * System-controlled
 */
interface SystemEntry {
    entryCode: string;
    listCode: string;
    lastUpdated: string;
    media: Results;
}

export type Entry = UserEntry & SystemEntry;

export interface EntryList {
    entries: Entry[];
    listCode: string;
    name: string;
    mediaType: MediaType;
    username: string;
}

export enum MediaType {
    Game = 'game',
    Show = 'tv',
    Movie = 'movie',
    Anime = 'anime',
}
