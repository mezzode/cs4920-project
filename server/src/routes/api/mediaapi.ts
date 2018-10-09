import * as igdb from 'igdb-api-node'.default ;
import * as fetch from "node-fetch";
import * as queries from './queries';

const client = igdb(queries.apiKeys.gameKey);

// give game ID, returns game data
export function gameFetch(id) {
    client.games({
        ids: [id],
        fields: '*',
    }).then(response => {
        console.log(JSON.stringify(response.body))
    }).catch(error => {
        throw error;
    });
}

// give movie ID, returns movie data
function movieFetch(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${queries.apiKeys.filmKey}`;
    const options = { method: 'GET' };
    console.log(url);
    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);
}

// give tv ID, returns tv data
function tvFetch(id) {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${queries.apiKeys.filmKey}`;
    const options = { method: 'GET' };
    console.log(url);
    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);
}

// give anime ID, returns anime data
export async function animeFetch(id) {
    const variables = {
        id,
    };

    const url = 'https://graphql.anilist.co';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: queries.entryA,
            variables,
        }),
    };
    const res = await fetch(url, options);
    handleData(res);
    const body = await res.json();
    return body;
}

// function handleResponse(response) {
//     return response.json().then(function (json) {
//         return response.ok ? json : Promise.reject(json);
//     });
// }

function handleData(data) {
    console.log(JSON.stringify(data));
}

function handleError(error) {
    console.error(error);
}


// animeFetch(15125).then(value => { console.log(value) })
// gameFetch(1234);
movieFetch(99861);
tvFetch(456);
