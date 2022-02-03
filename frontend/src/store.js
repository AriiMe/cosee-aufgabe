import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { postReducer, postDetailsReducer } from "./reducers/postReducers";
import { savedReducer } from "./reducers/savedReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';


const reducer = combineReducers({
  postList: postReducer,
  postDetails: postDetailsReducer,
  save: savedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const savedItemsFromStorage = localStorage.getItem("savedItems")
  ? JSON.parse(localStorage.getItem("savedItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    save: {savedItems: savedItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage},

};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
