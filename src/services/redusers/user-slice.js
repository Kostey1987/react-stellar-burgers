import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthChecked: false,
  userData: {
    email: "",
    name: "",
  },
  success: false,
  logoutRequest: false,
  userRequest: false,
  resetConfirmed: false,
  resetRequest: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogoutUser: (state) => {
      state.userData.email = "";
      state.userData.name = "";
    },
    setLogoutRequest: (state, action) => {
      state.logoutRequest = action.payload;
    },
    setUserRequest: (state, action) => {
      state.userRequest = action.payload;
    },
    setResetConfirmed: (state, action) => {
      state.resetConfirmed = action.payload;
    },
    setResetRequest: (state, action) => {
      state.resetRequest = action.payload;
    },
  },
});

export const {
  setAuthChecked,
  setUser,
  setLogoutUser,
  setLogoutRequest,
  registerUserReducer,
  setUserRequest,
  registerUser,
  setResetConfirmed,
  setResetRequest,
} = userSlice.actions;

export default userSlice.reducer;
