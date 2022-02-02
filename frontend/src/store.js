import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { postReducer, postDetailsReducer } from "./reducers/postReducers";
import { savedReducer } from "./reducers/savedReducers";

const reducer = combineReducers({
  postList: postReducer,
  postDetails: postDetailsReducer,
  save: savedReducer,
});

const savedItemsFromStorage = localStorage.getItem("savedItems")
  ? JSON.parse(localStorage.getItem("savedItems"))
  : [];

const initialState = {
    save: {savedItems: savedItemsFromStorage}
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
