import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";
import homeSlice from "./slice/homeSlice";

const store = configureStore({
  reducer: {
    auth:authSlice,
    user:userSlice,
    home:homeSlice,
  },
});
export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;  


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;