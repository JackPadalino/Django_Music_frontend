import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeArtists: [],
  storeTracks: [],
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setStoreArtists: (state, action) => {
      state.storeArtists = action.payload;
    },
    setStoreTracks: (state, action) => {
      state.storeTracks = action.payload;
    },
  },
});

export const { setStoreTracks, setStoreArtists } = musicSlice.actions;

export default musicSlice.reducer;
