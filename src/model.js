/**
 * Functions for fetching games from the backend.
 */

import fetch from "node-fetch";

const BASE_URL = process.env['REACT_APP_API_URL'];

export async function getRandomGame(numberOfPlayers, freeGamesOnly) {
    let apiResponse = await fetch(`${BASE_URL}/games/random?players=${numberOfPlayers}&free_only=${freeGamesOnly}`, {
        method: 'GET'
    });
    let jsonResponse = await apiResponse.json();
    return jsonResponse;
}

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
    return jsonResponse;
}