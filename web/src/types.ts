/**
 * User-controlled entry data.
 * TODO: proper types
 */
export interface UserEntry {
    rating?: number;
    started?: string;
    finished?: string;
    progress?: string;
    category: string;
    tags: string[];
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

export interface NewEntry extends Entry {
    mediaId: string;
    listCode: string;
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
    Show = 'tv',
    Movie = 'movie',
    Anime = 'anime',
}

export const isMediaType = (s: string): s is MediaType =>
    Object.keys(MediaType)
        .map(k => MediaType[k])
        .filter(t => t === s).length === 1;

// TODO: refactor into function for better separation
export const mediaUrl = {
    [MediaType.Game]: 'games',
    [MediaType.Show]: 'shows',
    [MediaType.Movie]: 'movies',
    [MediaType.Anime]: 'anime',
};

export const mediaDisplay = {
    [MediaType.Anime]: 'Anime',
    [MediaType.Game]: 'Games',
    [MediaType.Movie]: 'Movies',
    [MediaType.Show]: 'Shows',
};

export interface ListsMap {
    [listCode: string]: EntryList;
}

// From server/api/types.ts - TODO: common types
export type Media = Game | Movie | TV | Anime;

export interface Game {
    id: number;
    title: string;
    status: string;
    description: string;
    genres: string[];
    cover: string;
    category: string;
    themes: string[];
    publishers: string[];
    developers: string[];
    first_release_date: string;
}

export interface Movie {
    id: number;
    title: string;
    status: string;
    description: string;
    genres: string[];
    cover: string;
    releaseDate: string;
    production_companies: string[];
    production_countries: string[];
    tagline: string;
    runtime: number;
}

export interface TV {
    id: number;
    title: string;
    status: string;
    description: string;
    genres: string[];
    cover: string;
    type: string;
    firstAirDate: string;
    production_companies: string[];
    networks: string[];
    country: [];
    episodes: number;
    seasons: number;
}

export interface Anime {
    id: number;
    title: string;
    status: string;
    description: string;
    genres: string[];
    cover: string;
    format: string;
    startDate: string;
    endDate: string;
}
