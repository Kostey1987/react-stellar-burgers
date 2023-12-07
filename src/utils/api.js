import { baseUrl } from "../utils/constants";

export const getItems = (setIngredients) => {
  return fetch(`${baseUrl}/ingredients `)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((arr) => {
      setIngredients(arr.data);
    })
    .catch(console.error);
};
