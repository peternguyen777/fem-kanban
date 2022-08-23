import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import boardReducer from "./boardSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    board: boardReducer,
  },
});

export default store;
