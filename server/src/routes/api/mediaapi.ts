// tslint:disable:object-literal-sort-keys
// tslint:disable:no-any
import igdb from 'igdb-api-node';
import { DateTime } from 'luxon';
import * as fetch from 'node-fetch';
import * as queries from './queries';

interface Subset {
    id: number;
    name: string;
    description: string;
}

const client = igdb(process.env.GAMEKEY);

// give game ID, returns game data
export async function gameFetchID(id: number) {
    const res = await client.games(queries.gameFetchQuery(id));
    const data = res.body[0];
    // data normalisation
    const categoryMap = {
        '0': "Main Game",
        '1': "DLC/Addon",
        '2': "Expansion",
        '3': "Bundle",
        '4': "Standalone Expansion",
    };
    const statusMap = {
        '0': "Released",
        '2': "Alpha",
        '3': "Beta",
        '4': "Early Access",
        '5': "Offline",
        '6': "Cancelled",
    };
    const values = {
        'id': data.id,
        'title': data.name,
        'category': categoryMap[data.category] || "Unknown",
        'status': statusMap[data.status] || "Released",
        'description': data.summary,
        'developers': dataShift(data.developers),
        'publishers': dataShift(data.publishers),
        'genres': dataShift(data.genres),
        'themes': dataShift(data.themes),
        'cover': data.cover.url,
        'first_release_date': DateTime.fromMillis(data.first_release_date).toISO(),
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
export async function gameFetchSearch(name: string, page: number) {
    const res = await client.games(queries.gameSearchQuery(name, page));
    const normal = res.body.map((result: any) => {
        return {
            id: result.id,
            title: result.name,
            description: result.summary,
        }
    });
    const data = {
        media: normal,
        totalResults: res.headers['x-count'],
    };
    console.log(data);
    return data;
}

enum MovieTvType {
    Movie = 'movie',
    TV = 'tv',
}

// give movie/tv id and boolean, returns movie/tv data. Pass true for movie, false for tv 
export async function movietvFetchID(id: number, type: MovieTvType) {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.FILMKEY}`;
    const options = { method: 'GET' };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    let data = {};
    if (type === MovieTvType.Movie) {
        data = {
            'id': body.id,
            'title': body.title,
            'status': body.status,
            'genres': dataShift(body.genres),
            'description': body.overview,
            'coverImage': 'http://image.tmdb.org/t/p/w400' + body.poster_path,
            'releaseDate': body.release_date,
            'runtime': body.runtime,
            'production_companies': dataShift(body.production_companies),
            'production_countries': dataShift(body.production_countries),
            'tagline': body.tagline,
        };
    } else {
        data = {
            'id': body.id,
            'title': body.name,
            'description': body.overview,
            'status': body.status,
            'type': body.type,
            'genres': dataShift(body.genres),
            'firstAirDate': body.first_release_date,
            'networks': dataShift(body.networks),
            'episodes': body.number_of_episodes,
            'seasons': body.number_of_seasons,
            'country': body.origin_country,
            'production_companies': dataShift(body.production_companies),
            'coverImage': 'http://image.tmdb.org/t/p/w400' + body.poster_path,
        };
    }
    console.log(data);
    return body;
}


// give search string and boolean, returns movie/tv data. Pass true for movie, false for tv 
export async function movietvSearch(search: string, type: MovieTvType) {
    const term = search.replace(' ', '+');
    const url = `https://api.themoviedb.org/3/search/${type}/?api_key=${process.env.FILMKEY}&query=${term}`;
    const options = { method: 'GET' };

    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const results = body.results;
    // tslint:disable-next-line:no-any
    const newResults = results.map((result: any) => {
        if (type === MovieTvType.Movie) {
            return {
                'id': result.id,
                'title': result.title,
                'description': result.overview,
            };
        } else {
            return {
                'id': result.id,
                'title': result.name,
                'description': result.overview,
            };
        }
    });
    const data = {
        'totalResults': body.total_results,
        'media': newResults,
    }
    console.log(data);
    return data;
}

// give anime ID, returns anime data
export async function animeFetchID(id: number) {
    const variables = { id };
    const url = 'https://graphql.anilist.co';
    const options = {
        body: JSON.stringify({
            query: queries.entryA,
            variables,
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const { title, coverImage, startDate, endDate, ...rest } = body.data.Media;
    const data = {
        title: title.romaji,
        coverImage: coverImage.medium,
        startDate: DateTime.fromObject(startDate).toISO(),
        endDate: DateTime.fromObject(endDate).toISO(),
        ...rest,
    };
    console.log(data);
    return data;
}

// give search string and page number, returns anime ids and titles
export async function animeFetchSearch(name: string, pageNo: number) {
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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
    };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const data = body.data.Page.media;
    const newResults = data.map((result: any) => {
        const { title, ...rest } = result;
        return {
            title: result.title.romaji,
            ...rest,
        }
    });
    const final = {
        totalResults: body.data.Page.pageInfo.total,
        media: newResults,
    }
    console.log(final);
    return final;
}

// animeFetchID(15125);
// animeFetchSearch("Fate", 1);
// gameFetchID(501);
// gameFetchSearch("Batman", 1);
// movietvFetchID(99861, MovieTvType.Movie);
// movietvFetchID(456, MovieTvType.TV);
// movietvSearch("Batman", MovieTvType.Movie);
// movietvSearch("Batman", MovieTvType.TV);
console.log(process.env);
