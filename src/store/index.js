import { createAPI } from "../services/api";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { redirect } from "./middlewares/redirect";
import { toast } from 'react-toastify';

export const api = createAPI();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { api, toast },
        },
      }).concat(redirect),
});
