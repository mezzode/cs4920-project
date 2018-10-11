// TODO: share common types between web and server

/**
 * User-controlled entry data.
 * TODO: proper types
 */
export interface UserEntry {
    rating: number;
    started: string;
    finished: string;
    progress: string;
}

/**
 * System-controlled
 */
interface SystemEntry {
    entryCode: string;
    listCode: string;
    lastUpdated: string;
    media: Media;
}

export interface Media {
    mediaCode: string;
    title: string;
    artUrl: string;
}

export type Entry = UserEntry & SystemEntry;

export interface EntryList {
    entries: Entry[];
    listCode: string;
    name: string;
    mediaType: MediaType;
}

export enum MediaType {
    Game = 'game',
    Show = 'show',
    Movie = 'movie',
    Anime = 'anime',
}