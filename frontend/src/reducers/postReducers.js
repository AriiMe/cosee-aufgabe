import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_RESET,

  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
  POST_CREATE_REVIEW_RESET,
} from "../constants/postConstants";

export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return { loading: true, posts: [] };

    case POST_SUCCESS:
      return { loading: false, posts: action.payload };

    case POST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postDetailsReducer = (
  state = { post: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true, ...state };

    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };

    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };

    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };

    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case POST_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const postUpdateReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };

    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };

    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case POST_UPDATE_RESET:
      return { post: {} };

    default:
      return state;
  }
};

export const postReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REVIEW_REQUEST:
      return { loading: true };

    case POST_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true};

    case POST_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case POST_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};