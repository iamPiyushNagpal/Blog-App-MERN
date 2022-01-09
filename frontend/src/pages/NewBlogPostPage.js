import {
    Box, Container, Input, Button, Heading, VStack, FormControl, FormLabel
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Message from "../components/Message";
import MDEditor from '@uiw/react-md-editor'
import { useDispatch, useSelector } from 'react-redux';
import { createBlogPost } from '../actions/blogPostActions';
import { useNavigate } from 'react-router-dom';
import { BLOGPOST_CREATE_RESET } from '../constants/blogPostConstants';

const NewBlogPostPage = () => {

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const blogPostCreate = useSelector(state => state.blogPostCreate)
    const { loading, error, blogPost, success } = blogPostCreate;

    useEffect(() => {
        dispatch({ type: BLOGPOST_CREATE_RESET })
        if (success) {
            navigate("/");
        }
    }, [dispatch, navigate, success])

    const newBlogPostHandler = (e) => {
        e.preventDefault();
        dispatch(createBlogPost({
            image, title, body
        }))
    }

    return (
        <Container maxW={'container.lg'}>
            <Box maxW={'850px'} mx='auto'>
                <Heading py={5}>ADD BLOG POST</Heading>
                {error && <Message status="error" description={error} />}
                <form onSubmit={newBlogPostHandler}>
                    <VStack spacing={'2'}>
                        <FormControl isRequired>
                            <FormLabel>Image</FormLabel>
                            <Input id='image' type='text'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input id='title'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={6}>
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
                        colorScheme='teal'
                        isLoading={loading}
                        loadingText='Creating'
                    >ADD BLOG POST</Button>
                </form>
            </Box>
        </Container>
    )
}

export default NewBlogPostPage
