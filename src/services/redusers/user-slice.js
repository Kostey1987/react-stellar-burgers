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
  changePassword: false,
  changePasswordRequest: false,
  updateRequest: false,
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
    setChangePassword: (state, action) => {
      state.changePassword = action.payload;
    },
    setChangePasswordRequest: (state, action) => {
      state.changePasswordRequest = action.payload;
    },
    setUpdateUser: (state, action) => {
      state.userData.email = action.payload.user.email;
      state.userData.name = action.payload.user.name;
    },
    setUpdateUserRequest: (state, action) => {
      state.updateRequest = action.payload;
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
  setChangePassword,
  setChangePasswordRequest,
  setUpdateUser,
  setUpdateUserRequest,
} = userSlice.actions;

export default userSlice.reducer;
