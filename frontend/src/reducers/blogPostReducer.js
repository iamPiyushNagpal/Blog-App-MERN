import {
    BLOGPOST_CREATE_FAIL, BLOGPOST_CREATE_REQUEST, BLOGPOST_CREATE_RESET, BLOGPOST_CREATE_SUCCESS, BLOGPOST_LIST_FAIL, BLOGPOST_LIST_REQUEST, BLOGPOST_LIST_SUCCESS
} from "../constants/blogPostConstants"

export const blogPostListReducer = (state = { blogPosts: [] }, action) => {
    switch (action.type) {
        case BLOGPOST_LIST_REQUEST:
            return { loading: true, blogPosts: [] }
        case BLOGPOST_LIST_SUCCESS:
            return { loading: false, blogPosts: action.payload }
        case BLOGPOST_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const blogPostCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOGPOST_CREATE_REQUEST:
            return { loading: true }
        case BLOGPOST_CREATE_SUCCESS:
            return { loading: false, success: true, blogPost: action.payload }
        case BLOGPOST_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case BLOGPOST_CREATE_RESET:
            return {}
        default:
            return state;
    }
}