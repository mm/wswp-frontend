import {React, useState} from "react";
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button,
    Input, FormControl, FormLabel, Text, NumberInputField, NumberInput,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Checkbox,
    VStack, Textarea, HStack, FormHelperText, useToast, InputGroup, InputLeftElement,
    Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box
} from "@chakra-ui/react";
import {submitSuggestion} from "./model";


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
    const [formSubmissionErrors, setFormSubErrors] = useState();

    // All change handlers for the form elements:
    const handleGameNameChange = (event) => setGameName(event.target.value);
    const handleGameURLChange = (event) => setGameURL(event.target.value);
    const handleGameDescChange = (event) => setGameDesc(event.target.value);
    const handleMinPlayersChange = (event) => setMinPlayers(event.target.value);
    const handleMaxPlayersChange = (event) => setMaxPlayers(event.target.value);
    const handleSubmittedByChange = (event) => setSubmittedBy(event.target.value);
    const handlePaidChange = (event) => setIsPaid(event.target.checked);

    function sendSuggestion() {
        // Collects all data in state and sends it off to the backend
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
        })
    }

    function clearFormData() {
        // Clears form data in state after a submission
        setGameName(null);
        setGameURL(null);
        setGameDesc(null);
        setMinPlayers(null);
        setMaxPlayers(null);
        setSubmittedBy(null);
        setIsPaid(null);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit a game to the index</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                    Thanks so much for wanting to submit a game to this site! ❤️
                    </Text>
                    <Text py={2}>Fill out the quick form below with info about the game, and we'll work to get it in as soon as possible!</Text>

                    <Alert status="error">
                        <AlertIcon />
                        <Box flex="1">
                            <AlertTitle>An error occured during submission</AlertTitle>
                            <AlertDescription display="block">This would be where to enumerate validation errors</AlertDescription>
                        </Box>
                    </Alert>

                    <VStack spacing={3} mt={2}>
                    <FormControl id="gameName" isRequired>
                        <FormLabel>Game Name</FormLabel>
                        <Input name="game_name" value={gameName} placeholder="The name of the game you want to submit" onChange={handleGameNameChange} />
                    </FormControl>

                    <FormControl id="url" isRequired>
                        <FormLabel>Website</FormLabel>
                        <Input name="url" value={gameURL} placeholder="https://google.com" onChange={handleGameURLChange} />
                    </FormControl>

                    <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea value={gameDesc} placeholder="A short description of the game you're submitting (what platforms it's available on, cost, etc.)" name="description" onChange={handleGameDescChange} />
                    </FormControl>

                    <FormControl id="is_paid">
                        <Checkbox value={isPaid} name="is_paid" onChange={handlePaidChange}>This game costs money to play</Checkbox>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Number of players</FormLabel>
                        <HStack>
                        <NumberInput min={1}>
                            <NumberInputField placeholder={1} name="min_players" value={minPlayers} onChange={handleMinPlayersChange} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Text>to</Text>
                        <NumberInput min={0}>
                            <NumberInputField placeholder={4} name="max_players" value={maxPlayers} onChange={handleMaxPlayersChange} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Text>players</Text>
                        </HStack>
                        <FormHelperText>
                            Set the max players to 0 if there's no limit!
                        </FormHelperText>
                    </FormControl>

                    <FormControl id="name">
                        <FormLabel>Your name</FormLabel>
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