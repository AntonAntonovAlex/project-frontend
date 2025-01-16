import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { AuthorizationStatus } from "../../const";
import { loginAction, registerAction, getUsersAction } from "../api-actions";

const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userName: '',
    users: [],
    theme: 'light',
    userEmail: '',
    location: '',
};

export const userProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {
        logoutAction: (state) => {
            state.userName = '';
            state.userEmail = '';
            state.authorizationStatus = AuthorizationStatus.NoAuth;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        saveLocation: (state, action) => {
            state.location = action.payload;
        },
    },
    extraReducers(builder) {
      builder
        .addCase(loginAction.fulfilled, (state, action) => {
            state.authorizationStatus = AuthorizationStatus.Auth;
            state.userName = action.payload.name;
            state.userEmail = action.payload.email;
        })
        .addCase(loginAction.rejected, (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
        })
        .addCase(registerAction.fulfilled, (state, action) => {
            state.authorizationStatus = AuthorizationStatus.Auth;
            state.userName = action.payload.name;
            state.userEmail = action.payload.email;
        })
        .addCase(registerAction.rejected, (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
        })
        .addCase(getUsersAction.fulfilled, (state, action) => {
            state.users = action.payload;
        })
        .addCase(getUsersAction.rejected, (state) => {
            state.users = [];
        })
    }
});

export const {logoutAction, toggleTheme, saveLocation} = userProcess.actions;