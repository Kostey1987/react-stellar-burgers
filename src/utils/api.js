import { baseUrl } from "../utils/constants";
import {
  setAuthChecked,
  setUser,
  setLogoutUser,
  setLogoutRequest,
  setUserRequest,
  setResetConfirmed,
  setResetRequest,
} from "../services/redusers/user-slice";

export const getItems = (setIngredients) => {
  return fetch(`${baseUrl}/ingredients `).then(checkResponse);
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

export function saveOrder(data) {
  return fetch(`${baseUrl}/orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkResponse);
}

const refreshToken = () => {
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return (dispatch) => {
    return fetchWithRefresh("https://norma.nomoreparties.space/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(checkResponse)
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
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
          localStorage.removeItem("accessToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch(setLogoutUser());
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

export const register = (email, password, name) => {
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res));
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => {
    //   dispatch(setUserRequest(false));
    // });
  };
};

export const reset = () => {
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "",
      }),
    })
      .then(checkResponse)
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
