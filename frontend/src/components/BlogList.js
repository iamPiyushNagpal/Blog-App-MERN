import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogPosts } from '../actions/blogPostActions';
import { Flex, Image, Heading, Text, Box, Button } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import Message from './Message';
import Spinner from './Spinner';

const BlogList = () => {

    const dispatch = useDispatch();

    const blogPostList = useSelector(state => state.blogPostList);
    const { loading, error, blogPosts } = blogPostList;

    useEffect(() => {
        dispatch(getAllBlogPosts());
    }, [dispatch])

    return (
        <>
            {loading ? <Spinner /> : error ? <Message status="error" description={error} /> :
                <Box>
                    {blogPosts.map((blogPost) => (
                        <Flex flexDirection={{ base: 'column', lg: 'row' }} my={5} maxW={{ base: '400', lg: "100%" }} mx={{ base: "auto" }}>
                            <Box my={3} flex={{ lg: "1" }}>
                                <Image borderRadius={15}
                                    objectFit={'cover'}
                                    height={350} minWidth={350}
                                    src={blogPost.image} />
                            </Box>
                            <Box flex={{ lg: "2" }} mx={{ lg: "5" }}>
                                <Text mt={{ lg: "3" }}>{blogPost.author.name}</Text>
                                <Heading>{blogPost.title.slice(0, 45)}</Heading>
                                <MDEditor.Markdown
                                    style={{ fontSize: "20px" }}
                                    disallowedElements={['img']}
                                    source={blogPost.body.slice(0, 450) + '.....'}
                                />
                                <Button colorScheme={'purple'} mt={2}>READ MORE</Button>
                            </Box>
                        </Flex>

                    ))}
                </Box>
            }
        </>
    )
}

export default BlogList
