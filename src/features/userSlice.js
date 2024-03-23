import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
  },
});

export const { setData } = userSlice.actions;
export default userSlice.reducer;
