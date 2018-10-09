var igdb = require('igdb-api-node').default;
var fetch = require("node-fetch");
var queries = require('./queries');

var client = igdb(queries.apiKeys.gameKey);

function gameFetch() {
    client.games(queries.gameQuery).then(response => {
        console.log(JSON.stringify(response.body))
    }).catch(error => {
        throw error;
    });
}

function movieFetch(id) {
    var url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key='
        + queries.apiKeys.filmKey,
        options = {
            method: 'GET',
        };
    console.log(url);
    getData(url, options);
}

function tvFetch(id) {
    var url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key='
        + queries.apiKeys.filmKey,
        options = {
            method: 'GET',
        };
    console.log(url);
    getData(url, options);
}

function animeFetch(id) {
    var variables = {
        id: id
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: queries.entryA,
                variables: variables
            })
        };
    getData(url, options);

}

function getData(url, options) {
    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(JSON.stringify(data));
}

function handleError(error) {
    console.error(error);
}

//animeFetch(15125)
//gameFetch();
//movieFetch(99861);
tvFetch(456);
