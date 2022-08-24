import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuIsVisible: false,
  menuIsToggleable: true,
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
  },
});

export const { toggleMenu, toggleMenuClose, toggleableTrue, toggleableFalse } =
  uiSlice.actions;

export const selectMenuIsVisible = (state) => state.ui.menuIsVisible;
export const selectToggleable = (state) => state.ui.menuIsToggleable;

export default uiSlice.reducer;
