import itemReducer from "./ingredient-slice";
import { initialState } from "./ingredient-slice";
import { fetchIngredients } from "../ingredientsQuery";
import { hardcodedIngredients } from "../../utils/data";

describe("Тестирование загрузки ингредиентов itemSlice", () => {
  it("Тест fetchIngredients.fulfilled", () => {
    initialState;
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: {
        data: hardcodedIngredients,
      },
    };
    const nextState = itemReducer(initialState, action);

    expect(nextState.isLoading).toEqual(false);
    expect(nextState.itemsArray).toEqual(action.payload.data);
    expect(nextState.error).toBeUndefined();
  });

  it("Тест fetchIngredients.pending", () => {
    initialState;
    const action = { type: fetchIngredients.pending.type };
    const nextState = itemReducer(initialState, action);

    expect(nextState.isLoading).toEqual(true);
    expect(nextState.error).toBeUndefined();
  });

  it("Тест fetchIngredients.rejected", () => {
    initialState;
    const action = {
      type: fetchIngredients.rejected.type,
      payload: "Error message",
    };
    const nextState = itemReducer(initialState, action);

    expect(nextState.error).toEqual(action.payload);
    expect(nextState.isLoading).toEqual(false);
  });
});
