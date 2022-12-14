import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};
export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    storeData: (state, { payload }) => {
      
      state.data = payload;
    },
  },
});
export const { storeData } = saleSlice.actions;
