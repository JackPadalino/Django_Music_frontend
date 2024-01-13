import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeMobileView: false,
};

export const mobileSlice = createSlice({
  name: "mobileView",
  initialState,
  reducers: {
    setStoreMobileView: (state, action) => {
      state.storeMobileView = action.payload;
    },
  },
});

export const { setStoreMobileView } = mobileSlice.actions;

export default mobileSlice.reducer;
