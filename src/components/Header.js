import React from "react";

import { 
    Box, Center, Heading, Text, VStack, HStack,
    Container, Button, useDisclosure, useColorMode,
    useColorModeValue, Switch
} from "@chakra-ui/react";

import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi";

import PickGameModal from "./PickGameModal";
import SuggestGameModal from "./SuggestGameModal";

/**
 * Header component for the entire page. Displays some information about
 * the project, and renders buttons for submitting a game or picking
 * a random one.
 */
function Header() {

    // Disclosures for controlling visibility of the pick/suggest game modals:
    const pickGame = useDisclosure();
    const suggestGame = useDisclosure();

    const { colorMode, toggleColorMode } = useColorMode();
    const headerBackgroundColor = useColorModeValue('#B8DDF5', '#2D3748');
    const headerTextColor = useColorModeValue('#0D2035', "#ffffff");

    return (
        <>
        <PickGameModal onClose={pickGame.onClose} isOpen={pickGame.isOpen} />
        <SuggestGameModal onClose={suggestGame.onClose} isOpen={suggestGame.isOpen} />
        <Box bgColor={headerBackgroundColor} width="100%" padding="4" align="right">
            <HStack display={{base: "none", md: "flex"}}>
            <HiOutlineSun />
            <Switch 
                size="sm" 
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
                colorScheme="purple"
            />
            <HiOutlineMoon />
            </HStack>
            <Center>
                <VStack spacing="1rem" color={headerTextColor}>
                    <Heading>What should we play?</Heading>
                    <Container>
                    <Text align="center">
                        While we're social distancing or on lockdown due to COVID-19, playing games online together
                        can be a great way to feel connected. With so many games available online, it can be hard to
                        keep track! I built this little site to recommend games for your next online gathering and
                        provide an index to discover new ones.
                    </Text>
                    </Container>
                    <HStack>
                        <Button colorScheme="blue" onClick={pickGame.onOpen}>Pick a game for me</Button>
                        <Button colorScheme="blue" onClick={suggestGame.onOpen}>Suggest a game</Button>
                    </HStack>
                </VStack>
            </Center>
        </Box>
        </>
    )
}

export default Header;