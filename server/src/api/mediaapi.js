var igdb = require('igdb-api-node').default;
var fetch = require("node-fetch");
var queries = require('./queries');

var client = igdb(queries.apiKeys.gameKey);

function gameFetch() {
    client.games({
        fields: '*', // Return all fields
        limit: 1, // Limit to 5 results
        offset: 15 // Index offset for results
    }).then(response => {
        // response.body contains the parsed JSON response to this query
        console.log(JSON.stringify(response.body))
    }).catch(error => {
        throw error;
    });
}

// Make the HTTP Api request
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
    //alert('Error, check console');
    console.error(error);
}

//animeFetch(15125)
console.log(queries.apiKeys.gameKey);

gameFetch()
