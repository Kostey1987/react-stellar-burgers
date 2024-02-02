import { TIngredientType } from "../types/types";
import { selectIngredient, clearSelectedIngredient } from "./current-slice";
import { initialState, selectedSlice } from "./current-slice";

const object = {
  _id: "643d69a5c3f7b9001cfa093e",
  name: "Филе Люминесцентного тетраодонтимформа",
  type: "main",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  __v: 0,
};

describe("тест selectedSlice", () => {
  it("should handle selectIngredient", () => {
    const nextState = selectedSlice.reducer(
      initialState,
      selectIngredient(object)
    );

    expect(nextState.ingredient).toEqual(object);
  });

  it("should handle clearSelectedIngredient", () => {
    const nextState = selectedSlice.reducer(
      { ingredient: object },
      clearSelectedIngredient()
    );

    expect(nextState.ingredient).toBeNull();
  });
});
