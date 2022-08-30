import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuIsToggleable: true,
  menuDesktopIsVisible: false,
  menuMobileIsVisible: false,
  viewTaskIsVisible: false,
  addTaskIsVisible: false,
  editTaskIsVisible: false,
  deleteTaskIsVisible: false,
  addBoardIsVisible: false,
  editBoardIsVisible: false,
  deleteBoardIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenuDesktop: (state) => {
      state.menuDesktopIsVisible = !state.menuDesktopIsVisible;
    },
    toggleMenuDesktopClose: (state) => {
      state.menuDesktopIsVisible = false;
    },
    toggleMenuMobile: (state) => {
      state.menuMobileIsVisible = !state.menuMobileIsVisible;
    },
    toggleMenuMobileClose: (state) => {
      state.menuMobileIsVisible = false;
    },
    toggleableTrue: (state) => {
      state.menuIsToggleable = true;
    },
    toggleableFalse: (state) => {
      state.menuIsToggleable = false;
    },
    toggleViewTask: (state) => {
      state.viewTaskIsVisible = !state.viewTaskIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleViewTaskClose: (state) => {
      state.viewTaskIsVisible = false;
    },
    toggleAddTask: (state) => {
      state.addTaskIsVisible = !state.addTaskIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleAddTaskClose: (state) => {
      state.addTaskIsVisible = false;
    },
    toggleEditTask: (state) => {
      state.editTaskIsVisible = !state.editTaskIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleEditTaskClose: (state) => {
      state.editTaskIsVisible = false;
    },
    toggleDeleteTask: (state) => {
      state.deleteTaskIsVisible = !state.deleteTaskIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleDeleteTaskClose: (state) => {
      state.deleteTaskIsVisible = false;
    },
    toggleAddBoard: (state) => {
      state.addBoardIsVisible = !state.addBoardIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleAddBoardClose: (state) => {
      state.addBoardIsVisible = false;
    },
    toggleEditBoard: (state) => {
      state.editBoardIsVisible = !state.editBoardIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleEditBoardClose: (state) => {
      state.editBoardIsVisible = false;
    },
    toggleDeleteBoard: (state) => {
      state.deleteBoardIsVisible = !state.deleteBoardIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleDeleteBoardClose: (state) => {
      state.deleteBoardIsVisible = false;
    },
  },
});

export const {
  toggleMenuDesktop,
  toggleMenuDesktopClose,
  toggleMenuMobile,
  toggleMenuMobileClose,
  toggleableTrue,
  toggleableFalse,
  toggleViewTask,
  toggleViewTaskClose,
  toggleAddTask,
  toggleAddTaskClose,
  toggleEditTask,
  toggleEditTaskClose,
  toggleDeleteTask,
  toggleDeleteTaskClose,
  toggleAddBoard,
  toggleAddBoardClose,
  toggleEditBoard,
  toggleEditBoardClose,
  toggleDeleteBoard,
  toggleDeleteBoardClose,
} = uiSlice.actions;

export const selectMenuDesktopIsVisible = (state) =>
  state.ui.menuDesktopIsVisible;
export const selectMenuMobileIsVisible = (state) =>
  state.ui.menuMobileIsVisible;
export const selectToggleable = (state) => state.ui.menuIsToggleable;
export const selectViewTaskIsVisible = (state) => state.ui.viewTaskIsVisible;
export const selectAddTaskIsVisible = (state) => state.ui.addTaskIsVisible;
export const selectEditTaskIsVisible = (state) => state.ui.editTaskIsVisible;
export const selectDeleteTaskIsVisible = (state) =>
  state.ui.deleteTaskIsVisible;
export const selectAddBoardIsVisible = (state) => state.ui.addBoardIsVisible;
export const selectEditBoardIsVisible = (state) => state.ui.editBoardIsVisible;
export const selectDeleteBoardIsVisible = (state) =>
  state.ui.deleteBoardIsVisible;

export default uiSlice.reducer;
