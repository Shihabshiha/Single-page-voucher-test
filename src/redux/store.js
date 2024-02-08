import { configureStore } from "@reduxjs/toolkit";
import detailTableSlice from "./detailTableSlice";
import headerTableSlice from "./headerTableSlice";

export const store = configureStore({
  reducer: {
    detailTable: detailTableSlice,
    header : headerTableSlice,
  },
});

export default store;
