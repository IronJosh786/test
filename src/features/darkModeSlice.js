import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleTheme } = darkModeSlice.actions;
export default darkModeSlice.reducer;
