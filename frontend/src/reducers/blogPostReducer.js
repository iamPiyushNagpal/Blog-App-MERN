import {
    BLOGPOST_CREATE_FAIL, BLOGPOST_CREATE_REQUEST, BLOGPOST_CREATE_RESET, BLOGPOST_CREATE_SUCCESS
} from "../constants/blogPostConstants"

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