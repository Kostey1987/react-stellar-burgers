import { RootState } from "../../store/store";

export const modalSelector = (state: RootState) => state.modal.modalState;

export const getItemsSelector = (state: RootState) => {
  return state.items.itemsArray;
};

export const selectedIngredientSelector = (state: RootState) =>
  state.selected.ingredient;

export const bunSelector = (state: RootState) => state.sandwich.bun;

export const ingredientSelector = (state: RootState) =>
  state.sandwich.ingredients;

export const orderNumber = (state: RootState) => state.sandwich.order;

export const clearSelector = (state: RootState) => state.sandwich;
