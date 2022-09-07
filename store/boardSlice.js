import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setColumns: (state, action) => {
      const boardColumns = action.payload;
      state.columns = boardColumns;
    },
  },
});

export const { setColumns } = boardSlice.actions;

export const selectColumns = (state) => state.board.columns;

export default boardSlice.reducer;
