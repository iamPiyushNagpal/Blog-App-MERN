import {
    Box, Container, Input, Button, Heading, VStack, FormControl, FormLabel
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import MDEditor from '@uiw/react-md-editor'
import { useDispatch, useSelector } from 'react-redux';
import { updateBlogPost, getBlogPostDetails } from '../actions/blogPostActions';
import { useNavigate, useParams } from 'react-router-dom';
import { BLOGPOST_UPDATE_RESET } from '../constants/blogPostConstants';

const EditBlogPostPage = () => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blogPostDetails = useSelector(state => state.blogPostDetails)
    const { loading, error, blogPost } = blogPostDetails;

    const blogPostUpdate = useSelector(state => state.blogPostUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = blogPostUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BLOGPOST_UPDATE_RESET })
            navigate(`/blogpost/${id}`);
        }
        else {
            if (!blogPost || blogPost._id !== id) {
                dispatch(getBlogPostDetails(id));
            }
            else {
                setImage(blogPost.image);
                setTitle(blogPost.title);
                setBody(blogPost.body);
            }
        }


    }, [dispatch, navigate, blogPost, successUpdate, id])

    const updateBlogPostHandler = (e) => {
        e.preventDefault();
        dispatch(updateBlogPost({
            _id: id,
            image,
            title,
            body
        }))
    }

    return (
        <Container maxW={'container.lg'}>
            <Box maxW={'850px'} mx='auto'>
                <Heading py={5}>UPDATE BLOG POST</Heading>
                {loadingUpdate && <Spinner />}
                {error && <Message status="error" description={errorUpdate} />}
                {loading ? <Spinner /> :
                    error ? <Message status="error" description={error} /> : (


                        <form onSubmit={updateBlogPostHandler}>
                            <VStack spacing={'2'}>
                                <FormControl>
                                    <FormLabel>Image</FormLabel>
                                    <Input id='image' type='text'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl >
                                    <FormLabel>Title</FormLabel>
                                    <Input id='title'
                                        type='text'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl mt={6}>
                                    <FormLabel>Body</FormLabel>
                                    <MDEditor
                                        height={400}
                                        value={body}
                                        onChange={setBody}
                                    />
                                </FormControl>
                            </VStack>
                            <Button
                                type='submit'
                                my={4}
                                width={'100%'}
                                colorScheme='purple'
                                isLoading={loadingUpdate}
                                loadingText='Updating'
                            >UPDATE BLOG POST</Button>
                        </form>
                    )}
            </Box>
        </Container>
    )
}

export default EditBlogPostPage
