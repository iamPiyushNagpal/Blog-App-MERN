import {
    Box, Flex, IconButton, useDisclosure, Link, Heading, HStack, Button, VStack,
    Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Navbar = () => {

    const { isOpen, onToggle } = useDisclosure();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

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
                    {userInfo && <Button as={ReactRouterLink} to={`/blogposts/my-blogposts`}>MY POSTS</Button>}
                    {userInfo ?
                        <Menu>
                            <MenuButton as={Button}
                                rightIcon={<i className="fa-solid fa-angle-down"></i>}>
                                {userInfo.name}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            </MenuList>
                        </Menu> :
                        <Button leftIcon={<i className="fa-solid fa-user"></i>} as={ReactRouterLink} to='/login'>Log In</Button>
                    }
                </HStack>
            </Flex>
            {isOpen && (
                <Box bgColor={'gray.100'} py={5} display={{ md: 'none' }}>
                    <VStack>
                        {userInfo && <Button as={ReactRouterLink} to={`/blogposts/my-blogposts`}>MY POSTS</Button>}
                        {userInfo ?
                            <Menu>
                                <MenuButton as={Button}
                                    rightIcon={<i className="fa-solid fa-angle-down"></i>}
                                >
                                    {userInfo.name}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                                </MenuList>
                            </Menu> :
                            <Button leftIcon={<i className="fa-solid fa-user"></i>} as={ReactRouterLink} to='/login'>Log In</Button>
                        }
                    </VStack>
                </Box>
            )}
        </Box>
    )
}

export default Navbar
