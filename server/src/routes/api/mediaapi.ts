// tslint:disable:no-var-requires
const igdb = require('igdb-api-node').default;
const fetch = require('node-fetch');
import * as queries from './queries';

interface GameSubset {
    name: string;
}

const client = igdb(queries.apiKeys.gameKey);

// give game ID, returns game data
export async function gameFetchID(id: number) {
    const res = await client.games(queries.gameFetchQuery(id));
    const data = res.body[0];
    // data normalisation
    data.developers = gameDataShift(data.developers);
    data.publishers = gameDataShift(data.publishers);
    data.genres = gameDataShift(data.genres);
    data.themes = gameDataShift(data.themes);
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
    console.log(JSON.stringify(data));
    return data;
}

// helper function to normalise data
function gameDataShift(list: GameSubset[]) {
    const newList: string[] = [];
    for (const i of list) {
        newList.push(i.name);
    }
    return newList;
}

// give string and page number, returns array of game IDs. The last result is the total 
// number of results in the search
export async function gameFetchSearch(name: string, page: number) {
    const data = await client.games(queries.gameSearchQuery(name, page));
    data.body.unshift(data.headers['x-count']);
    console.log(data.body);
    return data.body;
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
    console.log(JSON.stringify(body));
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
    console.log(JSON.stringify(body.results));
    // to do: put total results in results, sort out page numberswarf
    return body.results;
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
        perPage: 10,
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
gameFetchID(25829);
gameFetchSearch("Batman", 1);
// movietvFetchID(99861, true);
// movietvFetchID(456, false);
// movietvSearch("Batman", true);
