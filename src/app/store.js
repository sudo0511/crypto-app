import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoAPI";
import { cryptoNewsAPI } from "../services/cryptoNewsAPI";

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsAPI.reducerPath]: cryptoNewsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      cryptoApi.middleware,
      cryptoNewsAPI.middleware,
    ]),
});

export default store;
