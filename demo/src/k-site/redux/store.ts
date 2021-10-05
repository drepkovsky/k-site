import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import index from "./reducers/index";
// import config from './clientconfig.json';

const initialState = {};
const middleware = [thunk];
const composeArguments = [applyMiddleware(...middleware)];

// if (config.environment === "dev") {
// composeArguments.push(
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// }

const store:any = createStore(index, initialState, compose(...composeArguments));

export default store;
