import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userSignupReducer } from './reducers/userReducers';
import {
    blogPostCommentCreateReducer, blogPostCommentsReducer, blogPostCreateReducer, blogPostDeleteReducer,
    blogPostDetailsReducer, blogPostListByAuthorReducer, blogPostListReducer,
    blogPostUpdateReducer
} from './reducers/blogPostReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    blogPostCreate: blogPostCreateReducer,
    blogPostList: blogPostListReducer,
    blogPostDetails: blogPostDetailsReducer,
    blogPostListByAuthor: blogPostListByAuthorReducer,
    blogPostDelete: blogPostDeleteReducer,
    blogPostUpdate: blogPostUpdateReducer,
    blogPostCommentCreate: blogPostCommentCreateReducer,
    blogPostComments: blogPostCommentsReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)));

export default store;