import { NameSpace } from "../../const";

export const getUserName = (state) => state[NameSpace.User].userName;
export const getUsers = (state) => state[NameSpace.User].users;
export const getAuthorizationStatus = (state) => state[NameSpace.User].authorizationStatus;
export const getTheme = (state) => state[NameSpace.User].theme;
export const getLocation = (state) => state[NameSpace.User].location;
export const getUserEmail = (state) => state[NameSpace.User].userEmail;