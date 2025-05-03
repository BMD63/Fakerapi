import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/productsApi";
import {personsApi} from '../services/personsApi';
import feedbackFormReducer from "../components/Feedback/feedbackFormSlice";


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [personsApi.reducerPath]: personsApi.reducer,
    feedbackForm: feedbackFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, personsApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;