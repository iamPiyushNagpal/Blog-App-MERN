import axios from 'axios';
import {
    BLOGPOST_CREATE_FAIL, BLOGPOST_CREATE_REQUEST, BLOGPOST_CREATE_SUCCESS,
    BLOGPOST_DETAILS_FAIL, BLOGPOST_DETAILS_REQUEST, BLOGPOST_DETAILS_SUCCESS,

    BLOGPOST_LIST_FAIL, BLOGPOST_LIST_REQUEST, BLOGPOST_LIST_SUCCESS
} from '../constants/blogPostConstants';

export const getAllBlogPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: BLOGPOST_LIST_REQUEST
        })

        const { data } = await axios.get('/api/blogs/');

        dispatch({
            type: BLOGPOST_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOGPOST_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

export const getBlogPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: BLOGPOST_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/blogs/${id}`);

        dispatch({
            type: BLOGPOST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BLOGPOST_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

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