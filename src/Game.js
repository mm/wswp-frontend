import React from "react";
import { Box, Flex, Link, Spacer, Badge, Center, IconButton } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

/**
 * Component for displaying an individual game in the grid.
 * @param {*} props 
 */
function Game(props) {

    // Pull out necessary fields:
    const {gameTitle, description, minPlayers, maxPlayers, isFree} = props.data;
    let playerDescription = maxPlayers ? `${minPlayers}-${maxPlayers}` : `${minPlayers}+`;

    return (
        <Box padding={2} borderRadius="lg" borderWidth="2px">
            <Flex direction="row" alignItems="baseline" fontSize="1.25rem">
                <Box fontWeight="bold">
                    <Link href="google.com" isExternal>{gameTitle}</Link>
                </Box>
                <Spacer />
                <IconButton aria-label="More information" icon={<InfoIcon/>} bg="" />
            </Flex>
            <Flex direction="row" textColor="grey" fontSize="sm" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="purple"><Center>Free</Center></Badge>
                <Spacer />
                <Box>{playerDescription} players</Box>
            </Flex>
            <Box marginTop="0.5rem" fontSize="sm" py={1}>
            {description}
            </Box>
        </Box>
    )
}

export default Game;

