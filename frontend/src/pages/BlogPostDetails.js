import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostDetails } from '../actions/blogPostActions';
import { Container, Image, Box, Heading, Text } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import Message from '../components/Message';
import Spinner from '../components/Spinner';

const BlogPostDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const blogPostDetails = useSelector(state => state.blogPostDetails);
    const { blogPost, loading, error } = blogPostDetails;

    useEffect(() => {
        dispatch(getBlogPostDetails(id));
    }, [dispatch, id])

    return (
        <Container maxW={'container.lg'}>
            {loading ? <Spinner /> : error ?
                <Message staus="error" description={error} /> :
                <Box my={5}>
                    <Image
                        src={blogPost.image}
                        borderRadius={12}
                        maxW={{ lg: "80%" }}
                        objectFit={'cover'}
                        mx={'auto'}
                    />
                    <Heading mt={{ base: 3, md: 6 }}>{blogPost.title}</Heading>
                    {/* <Text>{blogPost.author.name}</Text> */}
                    <MDEditor.Markdown
                        source={blogPost.body}
                        style={{ fontSize: "20px", marginTop: "6px" }}
                    />
                </Box>
            }
        </Container>
    )
}

export default BlogPostDetails
