import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  throwConfetti: false,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setThrowConfetti: (state, action) => {
      state.throwConfetti = action.payload;
    },
  },
});

export const { setThrowConfetti } = catalogSlice.actions;

export default catalogSlice.reducer;
