import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPostComments, createBlogPostComment } from '../actions/blogPostActions';
import {
    Box, Heading, Text, FormControl, FormLabel, Button, Textarea, ListItem, List, Divider
} from '@chakra-ui/react';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import {
    BLOGPOST_CREATE_COMMENT_RESET
} from '../constants/blogPostConstants';

const Comments = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [comment, setComment] = useState("");

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const blogPostCommentCreate = useSelector(state => state.blogPostCommentCreate);
    const { error: errorBlogPostCommentCreate, success: successBlogPostCommentCreate } = blogPostCommentCreate;

    const blogPostComments = useSelector(state => state.blogPostComments);
    const { comments, error: errorBlogPostComments, loading: loadingBlogPostComments } = blogPostComments;

    const createBlogPostCommentHandler = (e) => {
        e.preventDefault();
        dispatch(createBlogPostComment(id, {
            comment
        }))
    }

    useEffect(() => {
        if (successBlogPostCommentCreate) {
            setComment("");
            dispatch({ type: BLOGPOST_CREATE_COMMENT_RESET })
        }
        dispatch(getBlogPostComments(id));
    }, [dispatch, id, successBlogPostCommentCreate])

    return (
        <Box>
            <Box mt={'4rem'}>
                <Heading size={'lg'} color='purple.500'>Comments</Heading>
                {comments?.length === 0 && <Message status="info" description={`No Comments`} />}
                <List>
                    {comments?.map(comment => (
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
                {loadingBlogPostComments && <Spinner />}
                {errorBlogPostCommentCreate && <Message description={errorBlogPostCommentCreate} status="error" />}
                {errorBlogPostComments && <Message description={errorBlogPostComments} status="error" />}
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
        </Box>
    )
}

export default Comments
