export interface Subset {
    id: number;
    name: string;
    description: string;
    image: string | null;
    mediaType: string;
}

export interface Game {
    id: number;
    title: string;
    status: string;
    description: string;
    genres: string[];
    cover: string | null;
    category: string[];
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
    cover: string | null;
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
    cover: string | null;
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

export interface SearchResults {
    totalResults: number;
    media: Subset[];
}
