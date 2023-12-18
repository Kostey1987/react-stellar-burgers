import { baseUrl } from "../utils/constants";

export const getItems = (setIngredients) => {
  return fetch(`${baseUrl}/ingredients `).then(checkResponse);
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

export function saveOrder(data) {
  return fetch(`${baseUrl}/orders`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkResponse);
}
