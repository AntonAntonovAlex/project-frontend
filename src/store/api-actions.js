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
      dispatch(redirectToRoute(AppRoute.Main));
      return data.user.name;
    },
);

export const registerAction = createAsyncThunk(
    'users/register',
    async ({name, email, password}, {extra: api}) => {
      const { data } = await api.post(APIRoute.Register, {name, email, password});
      //console.log(data.token);
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

export const getTemplatesAction = createAsyncThunk(
  '/template',
  async (_arg, {extra: api}) => {
    const { data } = await api.get(APIRoute.Templates);
    return data.templates;
  },
);

export const postTemplateAction = createAsyncThunk(
  '/template/create',
  async (formattedData, {extra: api, dispatch}) => {
    const { data } = await api.post(APIRoute.PostTemplates, formattedData);
    console.log('data - ', data.message);
    dispatch(redirectToRoute(AppRoute.Main));
    return data.user.name;
  },
);

export const getTopicsAction = createAsyncThunk(
  '/topics',
  async (_arg, {extra: api}) => {
    const { data } = await api.get(APIRoute.Topics);
    return data;
  },
);
