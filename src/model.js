/**
 * Functions for fetching games from the backend, and submitting
 * them to it.
 */

import fetch from "node-fetch";

const BASE_URL = process.env['REACT_APP_API_URL'];

export class HTTPError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "HTTPError";
        this.statusCode = statusCode;
    }
}

export class ValidationError extends Error {
    constructor(message, failedValidators) {
        super(message);
        this.name = "Validation Error";
        this.failedValidators = failedValidators;
    }
}


/**
 * Fetches a list of games from the backend. If a searchTerm is passed,
 * will filter games by that criteria instead. Otherwise, will display
 * all games.
 * @param {string} searchTerm - The terms to search for games by.
 * @param {integer} page - The page to get results for.
 */
export async function getGames(searchTerm = null, page = 1) {

    let requestUrl = `${BASE_URL}/games?page=${page}`
    // Modify our request if the intent is to search
    if (searchTerm && (searchTerm !== "")) {
        requestUrl = `${BASE_URL}/games/search?query=${searchTerm}&page=${page ? page : 1}`
    }

    let response = await fetch(requestUrl);

    if (response.status === 200) {
        let json = await response.json();
        return json;
    }

    throw new HTTPError("Issue fetching games", response.status);
}


/**
 * Fetches a random game from the game index, given the number of players
 * and whether the party wants free games only or not.
 * @param {integer} numberOfPlayers 
 * @param {bool} freeGamesOnly 
 */
export async function getRandomGame(numberOfPlayers, freeGamesOnly) {
    let apiResponse = await fetch(`${BASE_URL}/games/random?players=${numberOfPlayers}&free_only=${freeGamesOnly}`, {
        method: 'GET'
    });

    if (apiResponse.status === 200) {
        let jsonResponse = await apiResponse.json();
        return jsonResponse;
    }

    throw new HTTPError("Issue fetching random game", apiResponse.status);
}


/**
 * Submits a game suggestion to the backend. Will throw a ValidationError
 * in the event any data fails validation checks.
 * @param {*} data 
 */
export async function submitSuggestion(data) {

    const postData = {
        'name': data.gameName,
        'url': data.gameURL,
        'description': data.gameDesc,
        'min_players': data.minPlayers,
        'max_players': data.maxPlayers,
        'paid': data.isPaid,
        'submitted_by': data.submittedBy
    }

    let apiResponse = await fetch(`${BASE_URL}/games/suggest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    let jsonResponse = await apiResponse.json();

    if (apiResponse.status === 200) {
        return jsonResponse;
    } else if (apiResponse.status === 422) {
        // Validation error occured server side, pass it off
        console.log(jsonResponse)
        throw new ValidationError(
            "Submission failed some validation checks",
            jsonResponse['issues']
        );
    } else {
        throw new HTTPError("Could not add submission -- internal server error", apiResponse.status)
    }

    
}