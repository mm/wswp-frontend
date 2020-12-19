import React from "react";
import { Box, VStack, Text, Link, Button } from "@chakra-ui/react";
import { GoHeart, GoMarkGithub } from "react-icons/go";

function Footer() {
    return (
        <Box bgColor="#9DD1F1" width="100%" py={6}>
            <VStack spacing={5}>
                <Text>Made with <GoHeart style={{display: 'inline'}}/> for a <Link href="https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k" isExternal>DigitalOcean</Link> hackathon by Matthew Mascioni</Text>
                <Button leftIcon={<GoMarkGithub />}><Link href="https://github.com/mm" isExternal>Check out project on GitHub</Link></Button>
            </VStack>
        </Box>
    )
}

export default Footer;