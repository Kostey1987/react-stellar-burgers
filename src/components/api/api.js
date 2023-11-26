import { baseUrl } from "../../utils/constants";

export const getItem = (setIngredients) => {
  return fetch(`${baseUrl}/ingredients `)
    .then((res) => res.json())
    .then((arr) => {
      setIngredients(arr.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
