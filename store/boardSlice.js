import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: 0,
  currentTask: {},
  //new data
  boardData: {},
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

    //new data
    setBoardData: (state, action) => {
      const selectedBoard = action.payload;
      state.boardData = selectedBoard;
    },
  },
});

export const { setCurrentBoard, setCurrentTask, setBoardData } =
  boardSlice.actions;

export const selectCurrentBoard = (state) => state.board.currentBoard;
export const selectCurrentTask = (state) => state.board.currentTask;
export const selectBoardData = (state) => state.board.boardData;

export default boardSlice.reducer;
