import { baseUrl } from "../utils/constants";

export const getItems = (setIngredients) => {
  return fetch(`${baseUrl}/ingredients `).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    err.status = res.status;
    Promise.reject(err);
  });
}

export function saveOrder(ingredients) {
  return fetch(`${baseUrl}/orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse);
}
