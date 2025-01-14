import { NameSpace } from "../../const";

export const getTemplates = (state) => state[NameSpace.Template].templates;
export const getTopics = (state) => state[NameSpace.Template].topics;
export const getTemplate = (state) => state[NameSpace.Template].template;
export const getComments = (state) => state[NameSpace.Template].comments;
export const getLikesCount = (state) => state[NameSpace.Template].likesCount;
export const getIsUserLiked = (state) => state[NameSpace.Template].isUserLiked;
export const getLatestTemplates = (state) => state[NameSpace.Template].latestTemplates;
export const getMostPopularTemplates = (state) => state[NameSpace.Template].mostPopularTemplates;
export const getUserTemplates = (state) => state[NameSpace.Template].userTemplates;