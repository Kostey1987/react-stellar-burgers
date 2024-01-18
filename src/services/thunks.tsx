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
import { TUserRegister, TUserUpdate } from "./types/types";
import { RootState } from "../store/store";
import { Action } from "redux";

export const userLogin = (
  email: string,
  password: string
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => {
  return (
    dispatch: (arg0: {
      payload: TUserRegister | boolean;
      type: "user/setUser" | "user/setAuthChecked";
    }) => void
  ) =>
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

export function userLogout() {
  return (
    dispatch: (arg0: {
      payload: boolean;
      type: "user/setLogoutRequest";
    }) => void
  ) => {
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
}

export function userRegister(data: TUserRegister) {
  return (
    dispatch: (arg0: {
      payload: TUserRegister | boolean;
      type: "user/setUser" | "user/setUserRequest";
    }) => void
  ) => {
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
}

export function userReset(email: string) {
  return (
    dispatch: (arg0: {
      payload: boolean;
      type: "user/setResetConfirmed" | "user/setResetRequest";
    }) => void
  ) => {
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
}

export function userResetPassword(password: string, token: string) {
  return (
    dispatch: (arg0: {
      payload: boolean;
      type: "user/setChangePasswordRequest";
    }) => void
  ) => {
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
}

export function update(name: string, email: string, password: string) {
  return (
    dispatch: (arg0: {
      payload: boolean | TUserUpdate;
      type: "user/setUpdateUser" | "user/setUpdateUserRequest";
    }) => void
  ) => {
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
}
