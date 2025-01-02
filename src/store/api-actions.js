import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveToken } from "../services/token";
import { APIRoute } from "../const";
import { redirectToRoute } from "./action";
import { AppRoute } from "../const";

export const loginAction = createAsyncThunk(
    'users/login',
    async ({email, password}, {extra: { api }, dispatch}) => {
        const { data } = await api.post(APIRoute.Login, {email, password});
        saveToken(data.token);
        dispatch(redirectToRoute(AppRoute.Main));
        return data.user.name;
    },
);

export const registerAction = createAsyncThunk(
    'users/register',
    async ({name, email, password}, {extra: { api }}) => {
      const { data } = await api.post(APIRoute.Register, {name, email, password});
      saveToken(data.token);
      return data.user.name;
    },
);

export const getUsersAction = createAsyncThunk(
    'users/users',
    async (_arg, {extra: { api }}) => {
      const { data } = await api.get(APIRoute.Users);
      return data;
    },
);

export const getTemplatesAction = createAsyncThunk(
  '/template',
  async (_arg, {extra: { api }}) => {
    const { data } = await api.get(APIRoute.Templates);
    return data.templates;
  },
);

export const getLatestTemplatesAction = createAsyncThunk(
  '/templates/latest',
  async (_arg, {extra: { api }}) => {
    const { data } = await api.get(APIRoute.LatestTemplates);
    return data.templates;
  },
);

export const getMostPopularTemplatesAction = createAsyncThunk(
  '/templates/popular',
  async (_arg, {extra: { api }}) => {
    const { data } = await api.get(APIRoute.MostPopularTemplates);
    return data.templates;
  },
);

export const getTemplateByIdAction = createAsyncThunk(
  '/template/:id',
  async (id, {extra: { api }}) => {
    const { data } = await api.get(`${APIRoute.Templates}/${id}`);
    return data.template;
  },
);

export const deleteTemplateAction = createAsyncThunk(
  '/template/:id',
  async (id, {extra: { api, toast }, dispatch}) => {
    try {
    const { data } = await api.delete(`${APIRoute.Templates}/${id}`);
    toast.success(data.message);
    dispatch(redirectToRoute(AppRoute.Main));
  } catch {
    dispatch(redirectToRoute(AppRoute.Main));
  }
  },
);

export const postTemplateAction = createAsyncThunk(
  '/template/create',
  async (formattedData, {extra: { api, toast }, dispatch}) => {
    const { data } = await api.post(APIRoute.PostTemplates, formattedData);
    toast.success(data.message);
    dispatch(redirectToRoute(AppRoute.Main));
    return data.user.name;
  },
);

export const getTopicsAction = createAsyncThunk(
  '/topics',
  async (_arg, {extra: { api }}) => {
    const { data } = await api.get(APIRoute.Topics);
    return data;
  },
);

export const postFormAction = createAsyncThunk(
  '/form',
  async ({templateId, answers}, {extra: { api, toast }, dispatch}) => {
    const { data } = await api.post(APIRoute.Form, {templateId, answers});
    toast.success(data.message);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const getCommentsAction = createAsyncThunk(
  '/comments/:templateId',
  async (templateId, {extra: { api }}) => {
    const { data } = await api.get(`${APIRoute.Comments}/${templateId}`);
    return data;
  },
);

export const addCommentAction = createAsyncThunk(
  '/comments',
  async ({templateId, text}, {extra: { api, toast }, dispatch}) => {
    const { data } = await api.post(APIRoute.Comments, {templateId, text});
    toast.success(data.message);
  },
);

export const getLikesForTemplateAction = createAsyncThunk(
  '/likes/:templateId',
  async (templateId, {extra: { api }}) => {
    const { data } = await api.get(`${APIRoute.Likes}/${templateId}`);
    return data;
  },
);

export const toggleLikeAction = createAsyncThunk(
  '/likes',
  async (templateId, {extra: { api, toast }, dispatch}) => {
    const { data } = await api.post(APIRoute.Likes, {templateId: templateId});
    dispatch(getLikesForTemplateAction(templateId));
    toast.success(data.message);
  },
);