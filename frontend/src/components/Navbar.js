import {
    Box, Flex, IconButton, useDisclosure, Link, Heading, HStack,Button, VStack
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const Navbar = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex bgColor={'gray.100'} p={3} justifyContent={'space-between'} alignItems={'center'}>
                <IconButton
                    display={{ md: 'none' }}
                    onClick={onToggle}
                    icon={isOpen ? <i className="fa-solid fa-xmark"></i> :
                        <i className="fa-solid fa-bars"></i>}
                />
                <Link as={ReactRouterLink} to={"/"}><Heading size="lg">BLOG</Heading></Link>
                <HStack display={{ base: 'none', md: 'flex' }}>
                    <Button leftIcon={<i className="fa-solid fa-user"></i>} as={ReactRouterLink} to='/login'>Log In</Button>
                </HStack>
            </Flex>
            {isOpen && (
                <Box bgColor={'gray.100'} py={5} display={{ md: 'none' }}>
                    <VStack>
                        <Button leftIcon={<i className="fa-solid fa-user"></i>} as={ReactRouterLink} to='/login'>Log In</Button>
                    </VStack>
                </Box>
            )}
        </Box>
    )
}

export default Navbar
