import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicSlice";
import styleReducer from "./styleSlice";
import mobileReducer from "./mobileSlice";
import catalogReducer from "./catalogSlice";

const store = configureStore({
  reducer: {
    music: musicReducer,
    style: styleReducer,
    mobile: mobileReducer,
    catalog: catalogReducer,
  },
});

export default store;
