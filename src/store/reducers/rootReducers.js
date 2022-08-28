import { authApi } from "../services/authApi";
import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../slices/authSlice";
import { appApi } from "../services/appApi";
import { saleSlice } from "../slices/saleSlice";

export default combineReducers({
  [authSlice.name]: authSlice.reducer,
  [saleSlice.name]: saleSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
});
