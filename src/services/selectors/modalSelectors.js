export const modalSelector = (state) => state.modal.modalState;

export const getItemsSelector = (state) => {
  return state.items.itemsArray;
};

export const selectedIngredientSelector = (state) => state.selected.ingredient;

export const bunSelector = (state) => state.constructor.bun;

export const ingredientSelector = (state) => state.constructor.addIngredients;

export const clearSelector = (state) => state.constructor.clearConstructor;
