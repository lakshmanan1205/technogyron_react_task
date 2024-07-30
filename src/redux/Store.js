import { configureStore } from "@reduxjs/toolkit";
import schemaReducer from "../features/segment/schemaSlice";

const store = configureStore({
  reducer: {
    schema: schemaReducer,
  },
});

export default store;
