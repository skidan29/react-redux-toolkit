import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter-clice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postApi } from "./api/post-api";

const rootReducer = combineReducers({
  counterReducer,
  [postApi.reducerPath]: postApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postApi.middleware]),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
