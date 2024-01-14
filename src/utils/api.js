import { baseUrl } from "./constants";
import { setUser } from "../services/slices/user-slice";

export const getItems = () => {
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
  return fetch(`${baseUrl}/token `, {
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

// const refreshToken = () => {
//   const token = localStorage.getItem("accessToken");
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };
//   if (!!token) {
//     headers.Authorization = token;
//   }
//   return fetch(`${baseUrl}/token `, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
//   }).then(checkResponse);
// };

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
    return fetchWithRefresh(`${baseUrl}/auth/user `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/auth/login `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};

export const logout = () => {
  return fetch(`${baseUrl}/auth/logout `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const register = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const reset = (email) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
};

export const resetPassword = (password, token) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse);
};

export const updateUser = (name, email, password) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};
