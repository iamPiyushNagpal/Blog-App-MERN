import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostDetails, createBlogPostComment } from '../actions/blogPostActions';
import {
    Container, Image, Box, Heading, Text, FormControl, FormLabel, Button, Textarea,
    ListItem, List, Divider
} from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { BLOGPOST_CREATE_COMMENT_RESET } from '../constants/blogPostConstants';

const BlogPostDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [comment, setComment] = useState("");

    const blogPostDetails = useSelector(state => state.blogPostDetails);
    const { blogPost, loading, error } = blogPostDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const blogPostCommentCreate = useSelector(state => state.blogPostCommentCreate);
    const { error: errorBlogPostComment, success: successBlogPostComment, loading: loadingBlogPostComment } = blogPostCommentCreate;

    useEffect(() => {
        if (successBlogPostComment) {
            setComment("");
            dispatch({ type: BLOGPOST_CREATE_COMMENT_RESET });
        }
        dispatch(getBlogPostDetails(id));
    }, [dispatch, id, successBlogPostComment])

    const createBlogPostCommentHandler = (e) => {
        e.preventDefault();
        dispatch(createBlogPostComment(id, {
            comment
        }))
    }

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
                    <Text mt={3}>{blogPost?.author?.name}</Text>
                    <MDEditor.Markdown
                        source={blogPost.body}
                        style={{ fontSize: "20px", marginTop: "6px" }}
                    />
                </Box>
            }
            <Box mt={'4rem'}>
                <Heading size={'lg'} color='purple.500'>Comments</Heading>
                {blogPost?.comments?.length === 0 && <Message status="info" description={`No Comments`} />}
                <List>
                    {blogPost?.comments?.map(comment => (
                        <ListItem my={4} key={comment._id}>
                            <Text fontSize={'lg'}>{comment.userName}</Text>
                            <Text>{comment.createdAt.substring(0, 10)}</Text>
                            <Text mt={3} fontSize={'lg'}>{comment.comment}</Text>
                            <Divider />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box mt={'3rem'}>
                <Heading size={'lg'} color='purple.500'>Write a comment</Heading>
                {successBlogPostComment && <Message status='success' description={`Comment Added Successfully`} />}
                {loadingBlogPostComment && <Spinner />}
                {errorBlogPostComment && <Message description={errorBlogPostComment} status="error" />}
                {userInfo ? (
                    <form onSubmit={createBlogPostCommentHandler}>
                        <FormControl id='comment'>
                            <FormLabel>Comment</FormLabel>
                            <Textarea
                                maxW={500}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            my={3}
                            colorScheme={'purple'}
                        >Add Comment</Button>
                    </form>
                ) : (
                    <Message description={`Please sign in to comment`} status="info" />
                )}
            </Box>
        </Container>
    )
}

export default BlogPostDetails
