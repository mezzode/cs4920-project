/**
 * User-controlled entry data.
 * TODO: proper types
 */
export interface UserEntry {
    rating: number;
    started: string;
    finished: string;
    progress: string;
    listCode: string;
}

/**
 * System-controlled
 */
interface SystemEntry {
    entryCode: string;
    lastUpdated: string; // TODO
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
    name: string;
}

export enum MediaType {
    games = 'games',
    shows = 'shows',
    movies = 'movies',
}
