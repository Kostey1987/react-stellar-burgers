import { ThunkAction } from "redux-thunk";
import {
  login,
  logout,
  register,
  reset,
  resetPassword,
  updateUser,
} from "../utils/api";
import {
  setAuthChecked,
  setChangePasswordRequest,
  setLogoutRequest,
  setResetConfirmed,
  setResetRequest,
  setUpdateUser,
  setUpdateUserRequest,
  setUser,
  setUserRequest,
} from "./slices/user-slice";
import { AppThunk, TUserRegister } from "./types/types";

export const userLogin = (email: string, password: string): AppThunk => {
  return (dispatch) =>
    login(email, password)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(setUser(res.user));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setAuthChecked(true)));
};

export const userLogout = (): AppThunk => {
  return (dispatch) => {
    logout()
      .then((res) => {
        dispatch(setLogoutRequest(true));
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLogoutRequest(false));
      });
  };
};

export const userRegister = (data: TUserRegister): AppThunk => {
  return (dispatch) => {
    register(data)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setUserRequest(false));
      });
  };
};

export const userReset = (email: string): AppThunk => {
  return (dispatch) => {
    reset(email)
      .then((res) => {
        if (res.success) {
          dispatch(setResetConfirmed(res.success));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setResetRequest(false));
      });
  };
};

export const userResetPassword = (
  password: string,
  token: string
): AppThunk => {
  return (dispatch) => {
    resetPassword(password, token)
      .then((res) => {
        if (res.success) {
          dispatch(setChangePasswordRequest(res.success));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setChangePasswordRequest(false));
      });
  };
};

export const update = (
  name: string,
  email: string,
  password: string
): AppThunk => {
  return (dispatch) => {
    updateUser(name, email, password)
      .then((res) => {
        dispatch(setUpdateUser(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setUpdateUserRequest(false));
      });
  };
};
