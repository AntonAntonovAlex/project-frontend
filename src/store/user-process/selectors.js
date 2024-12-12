import { NameSpace } from "../../const";

export const getUserName = (state) => state[NameSpace.User].userName;
export const getUsers = (state) => state[NameSpace.User].users;
export const getAuthorizationStatus = (state) => state[NameSpace.User].authorizationStatus;