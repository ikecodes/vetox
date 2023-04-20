import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.value = payload;
    },
    clearUser: (state) => {
      state.value = null
    },
    logOutUser: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions
export default userSlice.reducer;
