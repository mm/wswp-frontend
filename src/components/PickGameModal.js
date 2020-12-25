import {React, useState} from "react";
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
    FormControl, FormLabel, Text, NumberInputField, NumberInput,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Checkbox, Box
} from "@chakra-ui/react";

import {getRandomGame} from "../model";
import Game from "./Game";

/**
 * Presents a modal to show a user a random game.
 * @param {*} props 
 */
function PickGameModal(props) {
    // Pick up disclosure from parent:
    const { onClose, isOpen } = props;

    // Make the modal the source of truth for state (input elements):
    const [numberOfPlayers, setNumberOfPlayers] = useState();
    const handlePlayerChange = (value) => setNumberOfPlayers(value);
    const [freeOnly, setFreeOnly] = useState(false);
    const handleFreeOnlyChange = (event) => setFreeOnly(event.target.checked);

    const [isLoading, setIsLoading] = useState(false);
    // To store information about a game the backend returned:
    const [game, setGame] = useState({});
    // For detecting if someone's asked for a random game already:
    const [triedOnce, setTriedOnce] = useState(false);

    function fetchRandomGame() {
        setIsLoading(true);
        getRandomGame(numberOfPlayers, freeOnly).then((game) => {
            let randomGame = game['game'];
            setGame({
                gameTitle: randomGame['name'],
                description: randomGame['description'],
                id: randomGame['id'],
                minPlayers: randomGame['min_players'],
                maxPlayers: randomGame['max_players'],
                isFree: !randomGame['paid'],
                url: randomGame['url']
            });
            setIsLoading(false);
            setTriedOnce(true);
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pick a game for me</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                    Having trouble picking a game? We'll pick one for you! Just let us know the number of players
                    and we'll pick a game to fit you or your party.
                    </Text>

                    <FormControl isRequired py={4}>
                        <FormLabel>Number of players:</FormLabel>
                        <NumberInput 
                            min={1}
                            max={100}
                            value={numberOfPlayers}
                            onChange={handlePlayerChange}
                        >
                            <NumberInputField name="numberOfPlayers" placeholder="A number from 1 to 100"/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <Checkbox 
                            value={freeOnly}
                            onChange={handleFreeOnlyChange}
                            name="showFreeGamesOnly"
                        >
                            Show free games only
                        </Checkbox>
                    </FormControl>
                    <Box py={5}>
                        {(Object.keys(game).length > 0 && !isLoading) &&
                            <Game data={game} />
                        }
                    </Box>
                    {numberOfPlayers &&
                        <Button 
                        colorScheme="blue"
                        width="full"
                        onClick={fetchRandomGame}
                        isLoading={isLoading}
                        loadingText="Picking a game...">
                        {triedOnce ? "Not feeling this game? Click for a different one!" : "Pick a game"}
                        </Button>
                    }
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PickGameModal;