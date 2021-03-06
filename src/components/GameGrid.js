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
            isFree: !game['paid'],
            url: game['url'],
            submittedBy: game['submitted_by']
        })
    }).map(game => <Game data={game} key={game.id} isOnGrid/>);

    return (
        <Container maxWidth="100ch" marginTop={8}>
            <SimpleGrid minChildWidth="200px" spacing={5}>
                {gameComponents}
            </SimpleGrid>
        </Container>
    )

}

export default GameGrid;