import React from 'react';
import { SimpleGrid, Container } from "@chakra-ui/react";
import Game from "./Game";

/**
 * Component responsible for rendering the grid of available
 * games to choose from. Accepts a prop (data) to create game
 * grid tiles using.
 * @param {*} props 
 */
function GameGrid(props) {

    let gameComponents = props.gameData.map(game => {
        return({
            gameTitle: game['name'],
            description: game['description'],
            id: game['id'],
            minPlayers: game['min_players'],
            maxPlayers: game['max_players'],
            isFree: !game['paid']
        })
    }).map(game => <Game data={game} key={game.id} />);

    return (
        <Container maxWidth="100ch" marginTop="2rem">
            <SimpleGrid minChildWidth="200px" spacing={5}>
                {gameComponents}
            </SimpleGrid>
        </Container>
    )

}

export default GameGrid;