// tslint:disable-next-line:no-var-requires
const igdb = require('igdb-api-node').default;
// tslint:disable-next-line:no-var-requires
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

// give movie ID, returns movie data
export async function movieFetchID(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${queries.apiKeys.filmKey}`;
    const options = { method: 'GET' };
    console.log(url);

    const res = await fetch(url, options);
    const body = await res.json();
    console.log(JSON.stringify(body));
    return body;
}

// give tv ID, returns tv data
export async function tvFetchID(id: number) {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${queries.apiKeys.filmKey}`;
    const options = { method: 'GET' };
    console.log(url);

    const res = await fetch(url, options);
    const body = await res.json();
    console.log(JSON.stringify(res));
    return body;
}

// give anime ID, returns anime data
export async function animeFetchID(id: number) {
    const variables = {
        id,
    };

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

// animeFetchID(15125);
// gameFetchID(1234);
gameFetchSearch("Batman", 1);
// movieFetchID(99861);
// tvFetchID(456);
