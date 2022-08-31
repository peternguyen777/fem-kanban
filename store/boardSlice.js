import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: 0,
  currentTask: {},
  //new data
  boardData: {},
  allBoardData: [],
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
    setAllBoardData: (state, action) => {
      const allBoards = action.payload;
      state.allBoardData = allBoards;
    },
  },
});

export const {
  setCurrentBoard,
  setCurrentTask,
  setBoardData,
  setAllBoardData,
} = boardSlice.actions;

export const selectCurrentBoard = (state) => state.board.currentBoard;
export const selectCurrentTask = (state) => state.board.currentTask;
export const selectBoardData = (state) => state.board.boardData;
export const selectAllBoardData = (state) => state.board.allBoardData;

export default boardSlice.reducer;
