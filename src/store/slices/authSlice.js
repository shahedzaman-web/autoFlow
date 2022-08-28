import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";

const initialState = {
  isAuthenticated: false,

  userInfo: {},
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;

      state.userInfo = {};
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signinUser.matchFulfilled,

      (state, { payload }) => {
      
        state.userInfo = payload.payload
        state.isAuthenticated = true;
      }
    );
  },
});
export const { logout } = authSlice.actions;
