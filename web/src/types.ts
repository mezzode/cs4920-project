/**
 * User-controlled entry data.
 * TODO: proper types
 */
export interface UserEntry {
    rating?: number;
    started?: string;
    finished?: string;
    progress?: string;
}

/**
 * System-controlled
 */
interface SystemEntry {
    entryCode: string;
    lastUpdated: string; // TODO
    listCode: string;
    media: Media;
}

export type Entry = UserEntry & SystemEntry;

export interface Media {
    mediaCode: string;
    title: string;
    artUrl: string;
}

export interface EntryList {
    entries: Entry[];
    listCode: string;
    username: string;
    name: string;
}

export enum MediaType {
    movie = 'movie',
    tvshow = 'tv',
    anime = 'anime',
    game = 'game',
}

export interface ListsMap {
    [listCode: string]: EntryList;
}
