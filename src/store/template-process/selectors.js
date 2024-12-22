import { NameSpace } from "../../const";

export const getTemplates = (state) => state[NameSpace.Template].templates;
export const getTopics = (state) => state[NameSpace.Template].topics;