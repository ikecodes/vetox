import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import * as api from "../api/api"

// export const getStats = createAsyncThunk(
//   "dashboard/getStats",
//   async (args, { rejectWithValue }) => {
//     try {
//       const { data } = await api.getStats()
//       return data.data
//     } catch (error) {
//       rejectWithValue(error)
//     }
//   }
// )

const initialState = {
  active: "",
  showSub: false,
}

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    handleMenu: (state, { payload }) => {
      state.showSub = !state.showSub
      state.active = payload
    },
    resetMenu: (state, { payload }) => {
      state.showSub = false
      state.active = ""
    },
  },
  extraReducers: {
    // [getStats.pending]: (state, { payload }) => {
    //   state.loading = true
    // },
    // [getStats.fulfilled]: (state, { payload }) => {
    //   state.loading = false
    //   state.stats = payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { handleMenu, resetMenu } = navSlice.actions

export default navSlice.reducer
