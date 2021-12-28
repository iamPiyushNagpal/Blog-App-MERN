import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostsByAuthor } from '../actions/blogPostActions';
import { Flex, Image, Heading, Text, Box, Button, Container } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { Link as ReactRouterLink } from 'react-router-dom';

const MyBlogPostsPage = () => {

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const blogPostListByAuthor = useSelector(state => state.blogPostListByAuthor);
    const { error, loading, blogPosts } = blogPostListByAuthor;

    useEffect(() => {
        dispatch(getBlogPostsByAuthor(userInfo._id));
    }, [dispatch, userInfo._id])

    return (
        <Container maxW={'container.xl'}>
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
                            </Box>
                        </Flex>

                    ))}
                </Box>
            }
        </Container>
    )
}

export default MyBlogPostsPage
