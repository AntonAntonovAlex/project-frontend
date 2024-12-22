import { combineReducers } from "@reduxjs/toolkit";
import { NameSpace } from "../const";
import { userProcess } from "./user-process/user-process";
import { templateProcess } from "./template-process/template-process";

export const rootReducer = combineReducers({
    [NameSpace.User]: userProcess.reducer,
    [NameSpace.Template]: templateProcess.reducer,
});
