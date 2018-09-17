/**
 * User-controlled entry data.
 * TODO: proper types
 */
interface UserEntry {
    rating: number;
    started: string;
    finished: string;
    progress: string;
    listId: string;
}

/**
 * System-controlled
 */
interface SystemEntry {
    entryId: string;
    lastUpdated: string; // TODO
    media: Media;
}

export type Entry = UserEntry & SystemEntry;

export interface Media {
    mediaId: string;
    title: string;
}

export interface EntryList {
    entries: Entry[];
    id: string;
    name: string;
}

export enum MediaType {
    games = 'games',
    shows = 'shows',
    movies = 'movies',
}
