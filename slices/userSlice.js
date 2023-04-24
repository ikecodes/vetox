import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  cartNumber: 0,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.value = payload
    },
    setCartNumber: (state, { payload }) => {
      state.cartNumber = payload
    },
    clearUser: (state) => {
      state.value = null
    },
    logOutUser: (state, action) => {},
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setCartNumber } = userSlice.actions
export default userSlice.reducer;
