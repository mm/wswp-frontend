import React from "react";
import { Input, Container, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar() {

    return (
        <Container maxWidth="100ch" pt={8}>
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
            />
            <Input
                placeholder="search for games"
                size="md"
            />
        </InputGroup>
        </Container>
    )

}

export default SearchBar;