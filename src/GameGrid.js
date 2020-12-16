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

    return (
        <Container maxWidth="90ch">
            <SimpleGrid columns={4} spacing={2}>
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
            </SimpleGrid>
        </Container>
    )

}

export default GameGrid;