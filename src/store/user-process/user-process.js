import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { AuthorizationStatus } from "../../const";
import { loginAction, registerAction, getUsersAction } from "../api-actions";

const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userName: '',
    users: [],
    theme: 'light',
};

export const userProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {
        logoutAction: (state) => {
            state.userName = '';
            state.authorizationStatus = AuthorizationStatus.NoAuth;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
    extraReducers(builder) {
      builder
        /*.addCase(checkAuthAction.fulfilled, (state, action) => {
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.userName = action.payload;
        })
        .addCase(checkAuthAction.rejected, (state) => {
          state.authorizationStatus = AuthorizationStatus.NoAuth;
        })*/
        .addCase(loginAction.fulfilled, (state, action) => {
            state.authorizationStatus = AuthorizationStatus.Auth;
            state.userName = action.payload;
        })
        .addCase(loginAction.rejected, (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
        })
        .addCase(registerAction.fulfilled, (state, action) => {
            state.authorizationStatus = AuthorizationStatus.Auth;
            state.userName = action.payload;
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
        /*.addCase(logoutAction.fulfilled, (state) => {
          state.authorizationStatus = AuthorizationStatus.NoAuth;
        });*/
    }
});

export const {logoutAction, toggleTheme} = userProcess.actions;