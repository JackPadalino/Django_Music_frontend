import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeStyles: {},
};

export const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    setStoreStyles: (state, action) => {
      state.storeStyles = action.payload;
    },
  },
});

export const { setStoreStyles } = styleSlice.actions;

export default styleSlice.reducer;
