// TODO: share common types between web and server

/**
 * User-controlled entry data.
 * TODO: proper types
 */
interface UserEntry {
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
}
