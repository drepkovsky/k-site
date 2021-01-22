import { combineReducers } from "redux";

import context from "./red_con";
import forms from "./red_forms";

const appReducer = combineReducers({ context, forms });

export default appReducer;
