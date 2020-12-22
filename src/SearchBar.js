import React from "react";
import { Input, Container, InputLeftElement, InputGroup, Button, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar(props) {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            props.searchHandler();
        }
    }

    return (
        <Container maxWidth="100ch" pt={8}>
        <HStack>
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
            />
            <Input
                placeholder="search for games"
                size="md"
                value={props.searchTerm}
                onKeyPress={(e) => handleKeyPress(e)}
                onChange={(e) => props.setSearchTerm(e.target.value)}
            />

        </InputGroup>
        <Button onClick={() => props.searchHandler()}>Search</Button>
        </HStack>
        </Container>
    )

}

export default SearchBar;