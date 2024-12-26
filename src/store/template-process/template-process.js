import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { getTemplatesAction, getTopicsAction, getTemplateByIdAction, getCommentsAction } from "../api-actions";

const initialState = {
    templates: [],
    topics: [],
    template: {},
    comments: [],
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
        .addCase(getTemplateByIdAction.fulfilled, (state, action) => {
            state.template = action.payload;
        })
        .addCase(getTemplateByIdAction.rejected, (state) => {
            state.template = {};
        })
        .addCase(getCommentsAction.fulfilled, (state, action) => {
            state.comments = action.payload;
        })
        .addCase(getCommentsAction.rejected, (state) => {
            state.comments = [];
        })
    }
});
