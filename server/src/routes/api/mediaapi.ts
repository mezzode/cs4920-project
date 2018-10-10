// tslint:disable:no-var-requires
const igdb = require('igdb-api-node').default;
const fetch = require('node-fetch');
import * as queries from './queries';

const client = igdb(queries.apiKeys.gameKey);

// give game ID, returns game data
export async function gameFetchID(id: number) {
    const data = await client.games({
        fields: '*',
        ids: [id],
    });
    console.log(JSON.stringify(data.body[0]));
    return data.body[0];
}

// give string and page number, returns array of game IDs. The last result is the total 
// number of results in the search
export async function gameFetchSearch(name: string, page: number) {
    const data = await client.games({
        limit: '10',
        offset: (page - 1) * 10,
        order: 'name:asc',
        scroll: 1,
        search: name,
    }, ['id', 'name']);
    data.body.push(data.headers['x-count']);
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
    // to do: put total results in results
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
    console.log(JSON.stringify(body));
    return body;
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
    console.log(JSON.stringify(body));
    return body;
}

// animeFetchID(15125);
// animeFetchSearch("Fate", 1);
// gameFetchID(1234);
// gameFetchSearch("Batman", 1);
// movietvFetchID(99861, true);
// movietvFetchID(456);
movietvSearch("Batman", true);
