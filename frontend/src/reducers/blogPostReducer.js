import {
    BLOGPOST_CREATE_FAIL, BLOGPOST_CREATE_REQUEST, BLOGPOST_CREATE_RESET,
    BLOGPOST_CREATE_SUCCESS, BLOGPOST_DETAILS_FAIL, BLOGPOST_DETAILS_REQUEST,
    BLOGPOST_DETAILS_SUCCESS, BLOGPOST_LIST_FAIL, BLOGPOST_LIST_REQUEST,
    BLOGPOST_LIST_SUCCESS, BLOGPOST_LIST_BY_AUTHOR_FAIL, BLOGPOST_LIST_BY_AUTHOR_REQUEST,
    BLOGPOST_LIST_BY_AUTHOR_SUCCESS, BLOGPOST_DELETE_REQUEST, BLOGPOST_DELETE_SUCCESS,
    BLOGPOST_DELETE_FAIL, BLOGPOST_UPDATE_REQUEST, BLOGPOST_UPDATE_SUCCESS,
    BLOGPOST_UPDATE_FAIL, BLOGPOST_UPDATE_RESET, BLOGPOST_CREATE_COMMENT_REQUEST,
    BLOGPOST_CREATE_COMMENT_SUCCESS, BLOGPOST_CREATE_COMMENT_FAIL,
    BLOGPOST_CREATE_COMMENT_RESET, BLOGPOST_COMMENTS_REQUEST, BLOGPOST_COMMENTS_SUCCESS,
    BLOGPOST_COMMENTS_FAIL
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

export const blogPostDetailsReducer = (state = { blogPost: { comments: [] } }, action) => {
    switch (action.type) {
        case BLOGPOST_DETAILS_REQUEST:
            return { loading: true }
        case BLOGPOST_DETAILS_SUCCESS:
            return { loading: false, blogPost: action.payload }
        case BLOGPOST_DETAILS_FAIL:
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

export const blogPostListByAuthorReducer = (state = { blogPosts: [] }, action) => {
    switch (action.type) {
        case BLOGPOST_LIST_BY_AUTHOR_REQUEST:
            return { loading: true, blogPosts: [] }
        case BLOGPOST_LIST_BY_AUTHOR_SUCCESS:
            return { loading: false, blogPosts: action.payload }
        case BLOGPOST_LIST_BY_AUTHOR_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const blogPostDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOGPOST_DELETE_REQUEST:
            return { loading: true }
        case BLOGPOST_DELETE_SUCCESS:
            return { loading: false, success: true }
        case BLOGPOST_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const blogPostUpdateReducer = (state = { blogPost: {} }, action) => {
    switch (action.type) {
        case BLOGPOST_UPDATE_REQUEST:
            return { loading: true }
        case BLOGPOST_UPDATE_SUCCESS:
            return { loading: false, success: true, blogPost: action.payload }
        case BLOGPOST_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case BLOGPOST_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const blogPostCommentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOGPOST_CREATE_COMMENT_REQUEST:
            return { loading: true }
        case BLOGPOST_CREATE_COMMENT_SUCCESS:
            return { loading: false, success: true }
        case BLOGPOST_CREATE_COMMENT_FAIL:
            return { loading: false, error: action.payload }
        case BLOGPOST_CREATE_COMMENT_RESET:
            return {};
        default:
            return state;
    }
}

export const blogPostCommentsReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case BLOGPOST_COMMENTS_REQUEST:
            return { loading: true }
        case BLOGPOST_COMMENTS_SUCCESS:
            return { loading: false, comments: action.payload }
        case BLOGPOST_COMMENTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}