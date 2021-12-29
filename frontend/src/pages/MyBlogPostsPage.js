import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostsByAuthor, deleteBlogPost } from '../actions/blogPostActions';
import {
    Flex, Image, Heading, Text, Box, Button, Container, HStack, AlertDialog,
    AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

const MyBlogPostsPage = () => {

    // Required for AlertDialog to work
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const blogPostListByAuthor = useSelector(state => state.blogPostListByAuthor);
    const { error, loading, blogPosts } = blogPostListByAuthor;

    const blogPostDelete = useSelector(state => state.blogPostDelete);
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = blogPostDelete;

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
        else {
            dispatch(getBlogPostsByAuthor(userInfo._id));
        }
    }, [dispatch, successDelete, userInfo, navigate])

    const deleteBlogPostHandler = (id) => {
        dispatch(deleteBlogPost(id));
        setIsOpen(false);
    }

    return (
        <Container maxW={'container.xl'}>
            {loadingDelete && <Spinner />}
            {errorDelete && <Message status="error" description={error} />}
            {loading ? <Spinner /> : error ? <Message status="error" description={error} /> :
                <Box>
                    {blogPosts.map((blogPost) => (
                        <Flex key={blogPost._id} flexDirection={{ base: 'column', lg: 'row' }} my={5} maxW={{ base: '400', lg: "100%" }} mx={{ base: "auto" }}>
                            <Box my={3} flex={{ lg: "1" }} as={ReactRouterLink} to={`/blogpost/${blogPost._id}`}>
                                <Image borderRadius={15}
                                    objectFit={'cover'}
                                    height={350} minWidth={350}
                                    src={blogPost.image} />
                            </Box>
                            <Box flex={{ lg: "2" }} mx={{ lg: "5" }}>
                                <Text mt={{ lg: "3" }}>{userInfo.name}</Text>
                                <Heading as={ReactRouterLink} to={`/blogpost/${blogPost._id}`}>{blogPost.title.slice(0, 45)}</Heading>
                                <MDEditor.Markdown
                                    style={{ fontSize: "20px" }}
                                    disallowedElements={['img']}
                                    source={blogPost.body.slice(0, 450) + '.....'}
                                />
                                <Button
                                    as={ReactRouterLink}
                                    to={`/blogpost/${blogPost._id}`}
                                    colorScheme={'purple'}
                                    mt={2}
                                >READ MORE</Button>
                                <HStack mt={2}>
                                    <Button
                                        as={ReactRouterLink}
                                        to={`/blogpost/${blogPost._id}/edit`}
                                        colorScheme={'blue'}
                                        rightIcon={<i className="fa-solid fa-pencil"></i>}
                                    >EDIT</Button>
                                    <Button
                                        colorScheme={'red'}
                                        rightIcon={<i className="fa-solid fa-trash"></i>}
                                        onClick={() => setIsOpen(true)}
                                    >DELETE</Button>
                                </HStack>
                            </Box>
                            <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Delete Blog Post
                                        </AlertDialogHeader>
                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards.
                                        </AlertDialogBody>
                                        <AlertDialogFooter>
                                            <Button
                                                ref={cancelRef}
                                                onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                colorScheme='red'
                                                onClick={() => deleteBlogPostHandler(blogPost._id)}
                                                ml={3}>
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </Flex>
                    ))}
                </Box>
            }
        </Container>
    )
}

export default MyBlogPostsPage
