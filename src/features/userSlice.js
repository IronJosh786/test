import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData);
    },
  },
});

export const { setData } = userSlice.actions;
export default userSlice.reducer;
