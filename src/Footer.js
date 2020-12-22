import React from "react";
import { Box, VStack, Text, Link, Button, Divider } from "@chakra-ui/react";
import { GoHeart, GoMarkGithub } from "react-icons/go";

function Footer() {
    return (
        <Box width="100%" py={6}>
            <Divider width="80%" mx="auto" my={5} />
            <VStack spacing={5}>
                <Text>Made with <GoHeart style={{display: 'inline'}}/> for a <Link href="https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k" isExternal>DigitalOcean</Link> hackathon by Matthew Mascioni</Text>
                <Button leftIcon={<GoMarkGithub />}><Link href="https://github.com/mm" isExternal>Check out project on GitHub</Link></Button>
            </VStack>
        </Box>
    )
}

export default Footer;