import { NameSpace } from "../../const";

export const getTemplates = (state) => state[NameSpace.Template].templates;
export const getTopics = (state) => state[NameSpace.Template].topics;
export const getTemplate = (state) => state[NameSpace.Template].template;
export const getComments = (state) => state[NameSpace.Template].comments;