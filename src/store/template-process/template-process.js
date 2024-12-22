import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { getTemplatesAction, getTopicsAction } from "../api-actions";

const initialState = {
    templates: [],
    topics: [],
};

export const templateProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(getTemplatesAction.fulfilled, (state, action) => {
            state.templates = action.payload;
        })
        .addCase(getTemplatesAction.rejected, (state) => {
            state.templates = [];
        })
        .addCase(getTopicsAction.fulfilled, (state, action) => {
            state.topics = action.payload;
        })
    }
});
