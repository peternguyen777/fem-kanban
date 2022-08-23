import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuIsVisible: false,
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
  },
});

export const { toggleMenu, toggleMenuClose } = uiSlice.actions;

export const selectMenuIsVisible = (state) => state.ui.menuIsVisible;

export default uiSlice.reducer;
