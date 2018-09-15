/**
 * User-controlled entry data.
 * TODO: proper types
 */
interface UserEntry {
    rating: number;
    started: string;
    finished: string;
    progress: string;
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
