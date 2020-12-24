import React from "react";
import { 
    Box, Flex, Link, Spacer, Badge, Center, IconButton,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, Button, Heading, useDisclosure,
    Text, HStack
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

/**
 * Component for displaying an individual game in the grid.
 * Pass the isOnGrid prop if this is being rendered on the game grid.
 * @param {*} props 
 */
function Game(props) {

    // Pull out necessary fields:
    const {gameTitle, description, minPlayers, maxPlayers, isFree, url} = props.data;
    let playerDescription = maxPlayers ? `${minPlayers}-${maxPlayers}` : `${minPlayers}+`;
    const modalDisclosure = useDisclosure();

    return (
        <Box padding={2} borderRadius="lg" borderWidth="2px">
            <Flex direction="row" alignItems="baseline" fontSize="1.25rem">
                <Box fontWeight="bold">
                    <Link href={url} isExternal>{gameTitle}</Link>
                </Box>
                {props.isOnGrid &&
                    <>
                    <Spacer />
                    <IconButton 
                        aria-label="More information"
                        icon={<InfoIcon/>} bg=""
                        onClick={modalDisclosure.onOpen} 
                    />
                    <GameDetails onClose={modalDisclosure.onClose} isOpen={modalDisclosure.isOpen} data={props.data}/>
                    </>
                }
            </Flex>
            <Flex direction="row" textColor="grey" fontSize="sm" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme={isFree ? 'purple':'orange'}><Center>{isFree ? 'Free' : 'Paid'}</Center></Badge>
                <Spacer />
                <Box>{playerDescription} players</Box>
            </Flex>
            <Box marginTop="0.5rem" fontSize="sm" py={1}>
            <Text noOfLines={props.isOnGrid ? 4 : null}>{description}</Text>
            </Box>
        </Box>
    )
}


/**
 * Modal for displaying games from the homepage grid.
 * @param {*} props 
 */
function GameDetails(props) {
    const { onClose, isOpen, data } = props;
    const {gameTitle, description, minPlayers, maxPlayers, isFree, url, submittedBy} = data;
    let playerDescription = maxPlayers ? `${minPlayers}-${maxPlayers}` : `${minPlayers}+`;
    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>
                <Heading>{gameTitle}</Heading>
                <HStack fontSize="sm" pt={4}>
                    <Badge borderRadius="full" px="6" colorScheme={isFree ? 'purple':'orange'}><Center>{isFree ? 'Free' : 'Paid'}</Center></Badge>
                    <Box>{playerDescription} people can play</Box>
                </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>{description}</Text>
                <Text fontSize="sm" pt={5}>
                    {submittedBy && 'Submitted by: ' + submittedBy}
                </Text>
            </ModalBody>
            <ModalFooter>
                <Link href={url} width="full" isExternal><Button colorScheme="blue">Play game</Button></Link>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Game;

