import { baseUrl } from "./constants";
import { setUser } from "../services/slices/user-slice";
import { TError, TUserRegister } from "../services/types/types";

export const getItems = () => {
  return fetch(`${baseUrl}/ingredients `).then(checkResponse);
};

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}

export function saveOrder(data: string[]) {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (!!token) {
    headers.Authorization = token;
  }
  return fetch(`${baseUrl}/orders`, {
    headers,
    method: "POST",
    body: JSON.stringify({ ingredients: data }),
  }).then(checkResponse);
}

// const refreshToken = () => {
//   return fetch(`${baseUrl}/token `, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("accessToken"),
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem("refreshToken"),
//     }),
//   }).then(checkResponse);
// };

const refreshToken = () => {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (!!token) {
    headers.Authorization = token;
  }
  return fetch(`${baseUrl}/auth/token `, {
    method: "POST",
    headers,
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (
      err.message === "jwt expired" ||
      err.message === "You should be authorised"
    ) {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      (options.headers as { [key: string]: string }).authorization =
        refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return (
    dispatch: (arg0: {
      payload: TUserRegister | null;
      type: "user/setUser";
    }) => void
  ) => {
    const token = localStorage.getItem("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (!!token) {
      headers.Authorization = token;
    }
    return fetchWithRefresh(`${baseUrl}/auth/user `, {
      method: "GET",
      headers,
    });
  };
};

export const login = (email: string, password: string) => {
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

export const register = (data: TUserRegister) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const reset = (email: string) => {
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

export const resetPassword = (password: string, token: string) => {
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

export const updateUser = (name: string, email: string, password: string) => {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (!!token) {
    headers.Authorization = token;
  }
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse);
};
