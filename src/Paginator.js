import React from "react";
import {Button, ButtonGroup, HStack, Center} from "@chakra-ui/react";

/**
 * Component which renders all of the page-switching buttons.
 * @param {*} props 
 */
function Paginator(props) {

    // Create an array of page buttons from 1..max pages as
    // returned by the API:
    let pageButtons = [];
    for (let i = 1; i <= props.totalPages; i++) {
        let colorScheme = i === props.currentPage ? "blue" : null;

        pageButtons.push(
            <Button 
                key={i} 
                colorScheme={colorScheme}
                onClick={() => props.pageSetter(i) }
            >
                {i}
            </Button>
        );
    }

    return(
        <HStack direction="row" justify="center" py={5} spacing={4}>
            {pageButtons}
        </HStack>
    )
}

export default Paginator;