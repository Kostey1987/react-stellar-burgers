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

export function userLogin(email, password) {
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
}

export function userLogout() {
  return (dispatch) => {
    logout()
      .then((res) => {
        dispatch(setLogoutRequest());
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

export function userRegister(data) {
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
}

export function userReset(email) {
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
}

export function userResetPassword(password, token) {
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
}

export function update(name, email, password) {
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
}
