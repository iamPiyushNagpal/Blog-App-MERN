import axios from 'axios';
import {
    BLOGPOST_CREATE_FAIL, BLOGPOST_CREATE_REQUEST, BLOGPOST_CREATE_SUCCESS
} from '../constants/blogPostConstants';

export const createBlogPost = (blogPost) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BLOGPOST_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/blogs/create-blog-post',
            blogPost,
            config
        );

        dispatch({
            type: BLOGPOST_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOGPOST_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}