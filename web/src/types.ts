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
    mediaType: MediaType;
}

export interface NewEntryList {
    name: string;
    mediaType: MediaType;
}

// TODO: common types
export enum MediaType {
    Game = 'game',
    Show = 'show',
    Movie = 'movie',
    Anime = 'anime',
}

export const isMediaType = (s: string): s is MediaType =>
    Object.keys(MediaType)
        .map(k => MediaType[k])
        .filter(t => t === s).length === 1;

export const mediaUrl = {
    [MediaType.Game]: 'games',
    [MediaType.Show]: 'shows',
    [MediaType.Movie]: 'movies',
    [MediaType.Anime]: 'anime',
};

export interface ListsMap {
    [listCode: string]: EntryList;
}
