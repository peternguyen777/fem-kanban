import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: 0,
  // currentColumn: 0,
  currentTask: {
    title: "",
    description: "",
    status: "",
    subtasks: [],
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      const selectedBoard = action.payload;
      state.currentBoard = selectedBoard;
    },
    // setCurrentColumn: (state, action) => {
    //   const selectedColumn = action.payload;
    //   state.currentColumn = selectedColumn;
    // },
    setCurrentTask: (state, action) => {
      const selectedTask = action.payload;
      state.currentTask = selectedTask;
    },
  },
});

export const { setCurrentBoard, setCurrentColumn, setCurrentTask } =
  boardSlice.actions;

export const selectCurrentBoard = (state) => state.board.currentBoard;
// export const selectCurrentColumn = (state) => state.board.currentColumn;
export const selectCurrentTask = (state) => state.board.currentTask;

export default boardSlice.reducer;
