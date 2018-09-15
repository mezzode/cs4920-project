// export interface IEntry {
//     id: string;
//     title: string;
//     rating: number;
//     started: string;
//     finished: string;
//     progress: string; // TODO: proper types
// }

/**
 * User-controlled entry data.
 * TODO: proper types
 */
interface IUserEntry {
    rating: number;
    started: string;
    finished: string;
    progress: string;
}

/**
 * System-controlled
 */
interface ISystemEntry {
    entryId: string;
    lastUpdated: string; // TODO
    media: IMedia;
}

export type IEntry = IUserEntry & ISystemEntry;

export interface IMedia {
    mediaId: string;
    title: string;
}
