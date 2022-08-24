import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuIsVisible: false,
  menuIsToggleable: true,
  viewTaskIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuIsVisible = !state.menuIsVisible;
    },
    toggleMenuClose: (state) => {
      state.menuIsVisible = false;
    },
    toggleableTrue: (state) => {
      state.menuIsToggleable = true;
    },
    toggleableFalse: (state) => {
      state.menuIsToggleable = false;
    },
    toggleViewTask: (state) => {
      state.viewTaskIsVisible = !state.viewTaskIsVisible;
    },
    toggleViewTaskClose: (state) => {
      state.viewTaskIsVisible = false;
    },
  },
});

export const {
  toggleMenu,
  toggleMenuClose,
  toggleableTrue,
  toggleableFalse,
  toggleViewTask,
  toggleViewTaskClose,
} = uiSlice.actions;

export const selectMenuIsVisible = (state) => state.ui.menuIsVisible;
export const selectToggleable = (state) => state.ui.menuIsToggleable;
export const selectViewTaskIsVisible = (state) => state.ui.viewTaskIsVisible;

export default uiSlice.reducer;
