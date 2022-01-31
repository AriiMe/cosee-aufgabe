import { 
    POST_REQUEST,
    POST_SUCCESS,
    POST_FAIL,

    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
 } from '../constants/postConstants';



export const postReducer = (state ={posts:[]}, action) => {
    switch(action.type){
        case POST_REQUEST:
            return {loading: true, posts:[]}

        case POST_SUCCESS:
            return {loading: false, posts: action.payload}

        case POST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state;
    }
};

export const postDetailsReducer = (state ={post:{reviews:[]}}, action) => {
    switch(action.type){
        case POST_DETAILS_REQUEST:
            return {loading: true, ...state}

        case POST_DETAILS_SUCCESS:
            return {loading: false, post: action.payload}

        case POST_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state;
    }
};