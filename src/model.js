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