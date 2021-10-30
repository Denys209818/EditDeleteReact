import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import {createBrowserHistory} from 'history';
import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/authReducer";
import toastReducer from "./reducers/toastReducer";
import usersReducer from "./reducers/usersReducer";

export const history = createBrowserHistory();

var middleware = [thunk, routerMiddleware(history)];

var reducers = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    users: usersReducer,
    router: connectRouter(history)
});

const store = createStore(reducers, {}, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;
