import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { getTemplatesAction } from "../api-actions";

const initialState = {
    templates: [],
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
    }
});
