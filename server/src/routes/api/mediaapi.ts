// tslint:disable:no-var-requires
// tslint:disable:object-literal-sort-keys
const igdb = require('igdb-api-node').default;
const fetch = require('node-fetch');
import * as queries from './queries';

interface Subset {
    id: number;
    name: string;
}

const client = igdb(queries.apiKeys.gameKey);

// give game ID, returns game data
export async function gameFetchID(id: number) {
    const res = await client.games(queries.gameFetchQuery(id));
    const data = res.body[0];
    // data normalisation
    data.developers = dataShift(data.developers);
    data.publishers = dataShift(data.publishers);
    data.genres = dataShift(data.genres);
    data.themes = dataShift(data.themes);
    data.cover = data.cover.url;
    data.first_release_date = new Date(data.first_release_date).toISOString();
    switch (data.category) {
        case 0:
            data.category = "Main Game";
            break;
        case 1:
            data.category = "DLC/Addon";
            break;
        case 2:
            data.category = "Expansion";
            break;
        case 3:
            data.category = "Bundle";
            break;
        case 4:
            data.category = "Standalone Expansion";
            break;
        default:
            data.category = "Unknown";
            break;
    }
    switch (data.status) {
        case 0:
            data.status = "Released";
            break;
        case 2:
            data.status = "Alpha";
            break;
        case 3:
            data.status = "Beta";
            break;
        case 4:
            data.status = "Early Access";
            break;
        case 5:
            data.status = "Offline";
            break;
        case 6:
            data.status = "Cancelled";
            break;
        default:
            data.status = "Released";
            break;
    }
    console.log(JSON.stringify(data));
    return data;
}

// helper function to normalise data
function dataShift(list: Subset[]) {
    const newList: string[] = [];
    for (const i of list) {
        newList.push(i.name);
    }
    return newList;
}

// give string and page number, returns array of game IDs. The last result is the total 
// number of results in the search
export async function gameFetchSearch(name: string, page: number) {
    const res = await client.games(queries.gameSearchQuery(name, page));
    const data = {
        media: res.body,
        totalResults: res.headers['x-count'],
    };
    for (const i of data.media) {
        i.title = i.name;
        i.description = i.summary;
        delete i.name;
        delete i.summary;
    }
    console.log(data); {
        return data;
    }
}

// give movie/tv id and boolean, returns movie/tv data. Pass true for movie, false for tv 
export async function movietvFetchID(id: number, type: boolean) {
    let media = '';
    if (type) {
        media = "movie";
    } else {
        media = "tv"
    }
    const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${queries.apiKeys.filmKey}`;
    const options = { method: 'GET' };
    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    let data = {};
    if (type) {
        data = {
            'id': body.id,
            'title': body.title,
            'status': body.status,
            'genres': dataShift(body.genres),
            'description': body.overview,
            'coverImage': 'http://image.tmdb.org/t/p/w400' + body.poster_path,
            'releaseDate': new Date(body.release_date).toISOString(),
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
            'firstAirDate': new Date(body.first_air_date).toISOString(),
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
export async function movietvSearch(search: string, type: boolean) {
    let media = '';
    if (type) {
        media = "movie";
    } else {
        media = "tv"
    }
    const term = search.replace(' ', '+');
    const url = `https://api.themoviedb.org/3/search/${media}/?api_key=${queries.apiKeys.filmKey}&query=${term}`;
    const options = { method: 'GET' };

    const res = await fetch(url, options);
    const body = await res.json();
    // data normalisation
    const results = body.results;
    const newResults: object[] = [];
    for (const i of results) {
        let field = {};
        if (type) {
            field = {
                'id': i.id,
                'title': i.title,
                'description': i.overview,
            }
        } else {
            field = {
                'id': i.id,
                'title': i.name,
                'description': i.overview,
            }
        }
        newResults.push(field);
    }
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
    const data = body.data.Media;
    data.title = data.title.romaji;
    data.coverImage = data.coverImage.medium;
    data.startDate = new Date(data.startDate.year, data.startDate.month - 1, data.startDate.day).toISOString();
    data.endDate = new Date(data.endDate.year, data.endDate.month - 1, data.endDate.day).toISOString();
    console.log(JSON.stringify(data));
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
    const data = body.data.Page;
    for (const i of data.media) {
        i.title = i.title.romaji;
    };
    data.totalResults = data.pageInfo.total;
    delete data.pageInfo;
    console.log(JSON.stringify(data));
    return body;
}

// animeFetchID(15125);
// animeFetchSearch("Fate", 1);
// gameFetchID(501);
// gameFetchSearch("Batman", 1);
// movietvFetchID(99861, true);
// movietvFetchID(456, false);
// movietvSearch("Batman", true);
movietvSearch("Batman", false);
