export const modalSelector = (state) => state.modal.modalState;

export const getItemsSelector = (state) => {
  return state.items.itemsArray;
};

export const selectedIngredientSelector = (state) => state.selected.ingredient;

export const bunSelector = (state) => state.constructor_slice.bun;

export const ingredientSelector = (state) =>
  state.constructor_slice.ingredients;

export const clearSelector = (state) =>
  state.constructor_slice.clearConstructor;
