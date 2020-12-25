import {React, useState} from "react";
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
    Input, FormControl, FormLabel, Text, NumberInputField, NumberInput,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Checkbox,
    VStack, Textarea, HStack, FormHelperText, useToast, FormErrorMessage,
    Alert, AlertIcon, AlertTitle, AlertDescription, Box
} from "@chakra-ui/react";
import {submitSuggestion, HTTPError, ValidationError} from "../model";


function SuggestGameModal(props) {
    // Pick up disclosure from parent:
    const { onClose, isOpen } = props;
    const toast = useToast();

    // Control this form from this component's state:
    const [gameName, setGameName] = useState("");
    const [gameURL, setGameURL] = useState("");
    const [gameDesc, setGameDesc] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [isPaid, setIsPaid] = useState(false);
    const [submittedBy, setSubmittedBy] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    // All change handlers for the form elements:
    const handleGameNameChange = (event) => setGameName(event.target.value);
    const handleGameURLChange = (event) => setGameURL(event.target.value);
    const handleGameDescChange = (event) => setGameDesc(event.target.value);
    const handleMinPlayersChange = (value) => setMinPlayers(value);
    const handleMaxPlayersChange = (value) => setMaxPlayers(value);
    const handleSubmittedByChange = (event) => setSubmittedBy(event.target.value);
    const handlePaidChange = (event) => setIsPaid(event.target.checked);

    function sendSuggestion() {
        // Collects all data in state and sends it off to the backend
        setHasErrors(false);
        setValidationErrors({});
        setErrorMessage("");
        let data = {gameName, gameURL, gameDesc, minPlayers, maxPlayers, isPaid, submittedBy};
        submitSuggestion(data).then((response) => {
            console.log(response);
            toast({
                title: 'Submitted game successfully',
                description: 'Thanks so much!',
                status: 'success'
            });
            clearFormData();
            onClose();
        }).catch((error) => {
            setHasErrors(true);
            if (error instanceof ValidationError) {
                setErrorMessage("Please correct the errors below before continuing.")
                setValidationErrors(error.failedValidators);
            } else if (error instanceof HTTPError) {
                setErrorMessage(`A server error occured: ${error.statusCode}`);
            } else {
                setErrorMessage("An unknown error occured during submission.")
            }
        });
    }

    function clearFormData() {
        // Clears form data in state after a submission
        setGameName('');
        setGameURL('');
        setGameDesc('');
        setMinPlayers('');
        setMaxPlayers('');
        setSubmittedBy('');
        setIsPaid('');
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit a game to the index</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                    Thanks so much for wanting to submit a game to this site! ❤️
                    </Text>
                    <Text py={2}>Fill out the quick form below with info about the game, and we'll work to get it in as soon as possible!</Text>

                    {hasErrors &&
                        <Alert status="error">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>An error occured during submission</AlertTitle>
                            <AlertDescription display="block">{errorMessage}</AlertDescription>
                        </Box>
                        </Alert>
                    }

                    <VStack spacing={3} mt={2}>
                    <FormControl id="gameName" isRequired isInvalid={'name' in validationErrors}>
                        <FormLabel>Game Name</FormLabel>
                        <Input name="game_name" value={gameName} placeholder="The name of the game you want to submit" onChange={handleGameNameChange} />
                        <FormErrorMessage>{validationErrors['name']}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="url" isRequired isInvalid={'url' in validationErrors}>
                        <FormLabel>Website</FormLabel>
                        <Input name="url" value={gameURL} placeholder="https://google.com" onChange={handleGameURLChange} />
                        <FormErrorMessage>{validationErrors['url']}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="description" isRequired isInvalid={'description' in validationErrors}>
                        <FormLabel>Description</FormLabel>
                        <Textarea value={gameDesc} placeholder="A short description of the game you're submitting (what platforms it's available on, cost, etc.)" name="description" onChange={handleGameDescChange} />
                        <FormErrorMessage>{validationErrors['description']}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="is_paid">
                        <Checkbox value={isPaid} name="is_paid" onChange={handlePaidChange}>This game costs money to play</Checkbox>
                    </FormControl>

                    <HStack spacing={5} alignSelf='start' alignItems="baseline">
                        <FormControl isRequired isInvalid={'min_players' in validationErrors}>
                        <FormLabel>Minimum Players</FormLabel>
                        <NumberInput min={1} value={minPlayers} onChange={handleMinPlayersChange}>
                            <NumberInputField placeholder={1} name="min_players" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{validationErrors['min_players']}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={'max_players' in validationErrors}>
                        <FormLabel>Maximum Players</FormLabel>
                        <NumberInput min={0} value={maxPlayers} onChange={handleMaxPlayersChange}>
                            <NumberInputField placeholder={4} name="max_players" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{validationErrors['max_players']}</FormErrorMessage>
                        <FormHelperText>If there is no maximum, you can leave this blank or put 0</FormHelperText>
                        </FormControl>
                    </HStack>

                    <FormControl id="name">
                        <FormLabel>Your name (optional)</FormLabel>
                        <Input name="name" value={submittedBy} onChange={handleSubmittedByChange} />
                        <FormHelperText>
                            If you want a name to show as the one who submitted this game, enter it here. Otherwise you can leave this blank!
                        </FormHelperText>
                    </FormControl>
                    </VStack>

                </ModalBody>
                <ModalFooter>
                <Button 
                    colorScheme="blue"
                    width="full"
                    onClick={sendSuggestion}
                >
                    Submit game
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SuggestGameModal;