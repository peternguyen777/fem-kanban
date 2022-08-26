import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuIsToggleable: true,
  menuDesktopIsVisible: false,
  menuMobileIsVisible: false,
  viewTaskIsVisible: false,
  addTaskIsVisible: false,
  editTaskIsVisible: false,
  addBoardIsVisible: false,
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
    toggleAddBoard: (state) => {
      state.addBoardIsVisible = !state.addBoardIsVisible;
      state.menuMobileIsVisible = false;
    },
    toggleAddBoardClose: (state) => {
      state.addBoardIsVisible = false;
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
  toggleAddBoard,
  toggleAddBoardClose,
} = uiSlice.actions;

export const selectMenuDesktopIsVisible = (state) =>
  state.ui.menuDesktopIsVisible;
export const selectMenuMobileIsVisible = (state) =>
  state.ui.menuMobileIsVisible;
export const selectToggleable = (state) => state.ui.menuIsToggleable;
export const selectViewTaskIsVisible = (state) => state.ui.viewTaskIsVisible;
export const selectAddTaskIsVisible = (state) => state.ui.addTaskIsVisible;
export const selectEditTaskIsVisible = (state) => state.ui.editTaskIsVisible;
export const selectAddBoardIsVisible = (state) => state.ui.addBoardIsVisible;

export default uiSlice.reducer;
