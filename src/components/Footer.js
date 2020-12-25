import React from "react";
import { Box, VStack, HStack, Text, Link, Button, Divider, Flex, Spacer, Container } from "@chakra-ui/react";
import { GoHeart, GoMarkGithub } from "react-icons/go";
import { FaDev } from "react-icons/fa";

function Footer() {
    return (
        <Container width="100%" py={6}>
            <Divider width="80%" mx="auto" my={5} />
            <VStack spacing={5}>
                <Text align="center">Made with <GoHeart style={{display: 'inline', color: '#C42348'}}/> for a <Link href="https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k" isExternal>DigitalOcean</Link> hackathon by <Link href="https://mascioni.ca" isExternal>Matthew Mascioni</Link></Text>
                    <HStack display="block" width="100%" mx="auto" textAlign="center" spacing={4}>
                    <Link href="https://github.com/mm/wswp" isExternal><Button leftIcon={<GoMarkGithub />}>Check out project on GitHub</Button></Link>
                        <Link href="https://dev.to/mmascioni" isExternal><Button leftIcon={<FaDev />}>Follow me on DEV</Button></Link>
                    </HStack>
            </VStack>
        </Container>
    )
}

export default Footer;