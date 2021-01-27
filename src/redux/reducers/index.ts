import { combineReducers } from "redux";

import context from "./red_con";

const appReducer = combineReducers({ context });

export default appReducer;
export type RootState = ReturnType<typeof appReducer>;
