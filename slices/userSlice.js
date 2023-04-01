import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
  company: null,
  companies: [],
  users: [],
  monthReport: [],
  authToken: "",
  pushToken: "",
  isOffline: true,
};
const logUserOut = createAsyncThunk(
  "users/logout",
  async (userId, thunkAPI) => {
    await AsyncStorage.removeItem("user")
      .then(() => {
        return true;
      })
      .catch((error) => {
        thunkAPI.rejectWithValue(false);
      });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.value = payload;
    },
    setCompany: (state, { payload }) => {
      state.company = payload;
    },
    setCompanies: (state, { payload }) => {
      state.companies = payload;
    },
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    addCompany: (state, { payload }) => {
      state.companies.push(payload);
    },
    setIsOffline: (state, { payload }) => {
      state.isOffline = payload;
    },
    setMonthReport: (state, { payload }) => {
      state.monthReport = payload;
    },
    clearUser: (state) => {
      state.companies = [];
      state.value = null;
      state.company = null;
      state.monthReport = [];
    },
    logOutUser: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setCompany,
  setCompanies,
  setUsers,
  setIsOffline,
  setMonthReport,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
