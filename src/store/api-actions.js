import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveToken } from "../services/token";
import { APIRoute } from "../const";
import { redirectToRoute } from "./action";
import { AppRoute } from "../const";

export const loginAction = createAsyncThunk(
    'users/login',
    async ({email, password}, {extra: api, dispatch}) => {
      const { data } = await api.post(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Users));
      return data.user.name;
    },
);

export const registerAction = createAsyncThunk(
    'users/register',
    async ({name, email, password}, {extra: api}) => {
      const { data } = await api.post(APIRoute.Register, {name, email, password});
      console.log(data.token);
      saveToken(data.token);
      //dispatch(redirectToRoute(AppRoute.Main));
      return data.user.name;
    },
);

export const getUsersAction = createAsyncThunk(
    'users/users',
    async (_arg, {extra: api}) => {
      const { data } = await api.get(APIRoute.Users);
      return data;
    },
);