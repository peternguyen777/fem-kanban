import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleBoard: (state, action) => {
      const selectedBoard = action.payload;
      state.currentBoard = selectedBoard;
    },
  },
});

export const { toggleBoard } = boardSlice.actions;

export const selectCurrentBoard = (state) => state.board.currentBoard;

export default boardSlice.reducer;
