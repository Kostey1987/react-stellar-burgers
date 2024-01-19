import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser, TUserRegister, TUserUpdate } from "../types/types";

const initialState: TUser = {
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
  modalState: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUserRegister | null>) => {
      state.user = action.payload;
    },
    setLogoutUser: (state) => {
      state.userData.email = "";
      state.userData.name = "";
    },
    setLogoutRequest: (state, action: PayloadAction<boolean>) => {
      state.logoutRequest = action.payload;
    },
    setUserRequest: (state, action: PayloadAction<boolean>) => {
      state.userRequest = action.payload;
    },
    setResetConfirmed: (state, action: PayloadAction<boolean>) => {
      state.resetConfirmed = action.payload;
    },
    setResetRequest: (state, action: PayloadAction<boolean>) => {
      state.resetRequest = action.payload;
    },
    setChangePassword: (state, action: PayloadAction<boolean>) => {
      state.changePassword = action.payload;
    },
    setChangePasswordRequest: (state, action: PayloadAction<boolean>) => {
      state.changePasswordRequest = action.payload;
    },
    setUpdateUser: (state, action: PayloadAction<TUserUpdate>) => {
      state.userData.email = action.payload.email;
      state.userData.name = action.payload.name;
    },
    setUpdateUserRequest: (state, action: PayloadAction<boolean>) => {
      state.updateRequest = action.payload;
    },
  },
});

export const {
  setAuthChecked,
  setUser,
  setLogoutUser,
  setLogoutRequest,
  setUserRequest,
  setResetConfirmed,
  setResetRequest,
  setChangePassword,
  setChangePasswordRequest,
  setUpdateUser,
  setUpdateUserRequest,
} = userSlice.actions;

export default userSlice.reducer;

export type TUserActionCreators = typeof userSlice.actions;

export type TUserActions = ReturnType<
  TUserActionCreators[keyof TUserActionCreators]
>;
