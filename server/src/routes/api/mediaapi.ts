// tslint:disable:object-literal-sort-keys
// tslint:disable:no-any
import igdb from 'igdb-api-node';
import { DateTime } from 'luxon';
import * as fetch from 'node-fetch';
import * as queries from './queries';
import { Anime, Game, Movie, SearchResults, Subset, TV } from './types';

const client = igdb(process.env.GAMEKEY);

// give game ID, returns game data
export async function gameFetchID(id: number): Promise<Game> {
    const res = await client.games(queries.gameFetchQuery(id));
    const data = res.body[0];
    // data normalisation
    const categoryMap = {
        0: 'Main Game',
        1: 'DLC/Addon',
        2: 'Expansion',
        3: 'Bundle',
        4: 'Standalone Expansion',
    };
    const statusMap = {
        0: 'Released',
        2: 'Alpha',
        3: 'Beta',
        4: 'Early Access',
        5: 'Offline',
        6: 'Cancelled',
    };
    const values: Game = {
        id: data.id,
        title: data.name,
        category: categoryMap[data.category] || 'Unknown',
        status: statusMap[data.status] || 'Released',
        description: data.summary || '',
        developers: dataShift(data.developers),
        publishers: dataShift(data.publishers),
        genres: dataShift(data.genres),
        themes: dataShift(data.themes),
        cover: data.cover ? data.cover.url.replace('thumb', '1080p') : null,
        first_release_date: DateTime.fromMillis(
            data.first_release_date,
        ).toISO(),
    };
    console.log(values);
    return values;
}

// helper function to normalise data
function dataShift(list: Subset[]) {
    return list.map(({ name }) => name);
}

// give string and page number, returns array of game IDs. The last result is the total
// number of results in the search
export async function gameFetchSearch(
    name: string,
    page: number,
): Promise<SearchResults> {
    const res = await client.games(queries.gameSearchQuery(name, page));
    const normal = res.body.map((result: any) => {
        return {
            id: result.id,
            title: result.name,
            description: result.summary || '',
            image: result.cover
                ? result.cover.url.replace('thumb', '720p')
                : null,
            mediaType: 'game',
        };
    });
    const data: SearchResults = {
        media: normal,
        totalResults: res.headers['x-count'],
    };
    console.log(data);
    return data;
}

export enum MovieTvType {
    Movie = 'movie',
    TV = 'tv',
}

// give movie/tv id and boolean, returns movie/tv data. Pass true for movie, false for tv
export async function movietvFetchID(
    id: number,
    type: MovieTvType,
): Promise<Movie | TV> {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${
        process.env.FILMKEY
    }`;
    const options = { method: 'GET' };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    if (type === MovieTvType.Movie) {
        const data: Movie = {
            id: body.id,
            title: body.title,
            status: body.status,
            genres: dataShift(body.genres),
            description: body.overview,
            cover: body.poster_path
                ? `http://image.tmdb.org/t/p/w780/${body.poster_path}`
                : null,
            releaseDate: body.release_date,
            runtime: body.runtime,
            production_companies: dataShift(body.production_companies),
            production_countries: dataShift(body.production_countries),
            tagline: body.tagline,
        };
        return data;
    } else {
        const data: TV = {
            id: body.id,
            title: body.name,
            description: body.overview,
            status: body.status,
            type: body.type,
            genres: dataShift(body.genres),
            firstAirDate: body.first_release_date,
            networks: dataShift(body.networks),
            episodes: body.number_of_episodes,
            seasons: body.number_of_seasons,
            country: body.origin_country,
            production_companies: dataShift(body.production_companies),
            cover: body.poster_path
                ? `http://image.tmdb.org/t/p/w780/${body.poster_path}`
                : null,
        };
        return data;
    }
}

// give search string and boolean, returns movie/tv data. Pass true for movie, false for tv
export async function movietvSearch(
    search: string,
    type: MovieTvType,
    page: number,
): Promise<SearchResults> {
    const term = search.replace(' ', '+');
    const url = `https://api.themoviedb.org/3/search/${type}/?api_key=${
        process.env.FILMKEY
    }&query=${term}&page=${page}`;
    const options = { method: 'GET' };

    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const results = body.results;
    // tslint:disable-next-line:no-any
    const newResults = results.map((result: any) => {
        if (type === MovieTvType.Movie) {
            return {
                id: result.id,
                title: result.title,
                description: result.overview,
                image: result.poster_path
                    ? 'http://image.tmdb.org/t/p/w400' + result.poster_path
                    : null,
                mediaType: 'movie',
            };
        } else {
            return {
                id: result.id,
                title: result.name,
                description: result.overview,
                image: result.poster_path
                    ? 'http://image.tmdb.org/t/p/w400' + result.poster_path
                    : null,
                mediaType: 'tv',
            };
        }
    });
    const data: SearchResults = {
        totalResults: body.total_results,
        media: newResults,
    };
    console.log(data);
    return data;
}

// give anime ID, returns anime data
export async function animeFetchID(id: number): Promise<Anime> {
    const variables = { id };
    const url = 'https://graphql.anilist.co';
    const options = {
        body: JSON.stringify({
            query: queries.entryA,
            variables,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const {
        title,
        coverImage,
        description,
        startDate,
        endDate,
        ...rest
    } = body.data.Media;
    const data: Anime = {
        title: title.romaji,
        cover: coverImage.extraLarge,
        description: (description as string).replace(/(<br>)+/g, ''), // get rid of <br> tags
        startDate: DateTime.fromObject(startDate).toISO(),
        endDate: DateTime.fromObject(endDate).toISO(),
        ...rest,
    };
    console.log(data);
    return data;
}

// give search string and page number, returns anime ids and titles
export async function animeFetchSearch(
    name: string,
    pageNo: number,
): Promise<SearchResults> {
    const variables = {
        page: pageNo,
        perPage: 20,
        search: name,
    };
    const url = 'https://graphql.anilist.co';
    const options = {
        body: JSON.stringify({
            query: queries.searchA,
            variables,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const data = body.data.Page.media;
    const newResults = data.map((result: any) => {
        const { title, description, coverImage, ...rest } = result;
        return {
            title: result.title.romaji,
            description: (description as string).replace(/(<br>)+/g, ''), // get rid of <br> tags
            image: result.coverImage.medium,
            mediaType: 'anime',
            ...rest,
        };
    });
    const final: SearchResults = {
        totalResults: body.data.Page.pageInfo.total,
        media: newResults,
    };
    console.log(final);
    return final;
}
