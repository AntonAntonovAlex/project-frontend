import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import {
    getTemplatesAction,
    getTopicsAction,
    getTemplateByIdAction,
    getCommentsAction,
    getLikesForTemplateAction,
    getLatestTemplatesAction,
    getMostPopularTemplatesAction,
    getUserTemplatesAction
} from "../api-actions";

const initialState = {
    templates: [],
    topics: [],
    template: null,
    comments: [],
    likesCount: 0,
    isUserLiked: false,
    latestTemplates: [],
    mostPopularTemplates: [],
    userTemplates: [],
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
            state.template = null;
        })
        .addCase(getTemplateByIdAction.pending, (state) => {
            state.template = null;
        })
        .addCase(getCommentsAction.fulfilled, (state, action) => {
            state.comments = action.payload;
        })
        .addCase(getCommentsAction.rejected, (state) => {
            state.comments = [];
        })
        .addCase(getLikesForTemplateAction.fulfilled, (state, action) => {
            state.likesCount = action.payload.likesCount;
            state.isUserLiked = action.payload.userLiked;
        })
        .addCase(getLikesForTemplateAction.rejected, (state) => {
            state.likesCount = 0;
            state.isUserLiked = false;
        })
        .addCase(getLatestTemplatesAction.fulfilled, (state, action) => {
            state.latestTemplates = action.payload;
        })
        .addCase(getLatestTemplatesAction.rejected, (state) => {
            state.latestTemplates = [];
        })
        .addCase(getMostPopularTemplatesAction.fulfilled, (state, action) => {
            state.mostPopularTemplates = action.payload;
        })
        .addCase(getMostPopularTemplatesAction.rejected, (state) => {
            state.mostPopularTemplates = [];
        })
        .addCase(getUserTemplatesAction.fulfilled, (state, action) => {
            state.userTemplates = action.payload;
        })
        .addCase(getUserTemplatesAction.rejected, (state) => {
            state.userTemplates = [];
        })
    }
});
