import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: 0,
  currentTask: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      const selectedBoard = action.payload;
      state.currentBoard = selectedBoard;
    },
    setCurrentTask: (state, action) => {
      const selectedTask = action.payload;
      state.currentTask = selectedTask;
    },
  },
});

export const { setCurrentBoard, setCurrentTask } = boardSlice.actions;

export const selectCurrentBoard = (state) => state.board.currentBoard;
export const selectCurrentTask = (state) => state.board.currentTask;

export default boardSlice.reducer;
