import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "../features/darkModeSlice.js";
import userReducer from "../features/userSlice.js";

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    user: userReducer,
  },
});
