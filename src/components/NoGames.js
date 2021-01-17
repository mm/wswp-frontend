import React from "react";
import { Box, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react";


/**
 * Empty state component when no games are found.
 * @param {*} props 
 */
function NoGames(props) {

    const noGamesMessages = {
        noGames: 'Looks like the index of games is empty! Add to the collection by clicking "Suggest a game!"',
        searchFailed: "We couldn't find any games matching that description. Try another search or click 'Pick a game for me!'"
    }

    const emptyStateBgColour = useColorModeValue('#F7FAFC', '#2D3748')

    return (
        <Box maxW="sm" ml="auto" mr="auto" mt={10} mb={10} p={5} borderRadius="md" bg={emptyStateBgColour}>
            <VStack>
            <Heading size="md">No Games Found 😢</Heading>
            <Text>{noGamesMessages[props.reason]}</Text>
            </VStack>
        </Box>
    )

}

export default NoGames;