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
} = userSlice.actions;

export default userSlice.reducer;
