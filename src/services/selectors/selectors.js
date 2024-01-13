export const modalSelector = (state) => state.modal.modalState;

export const getItemsSelector = (state) => {
  return state.items.itemsArray;
};

export const selectedIngredientSelector = (state) => state.selected.ingredient;

export const bunSelector = (state) => state.sandwich.bun;

export const ingredientSelector = (state) => state.sandwich.ingredients;

export const orderNumber = (state) => state.sandwich.order.number;

export const clearSelector = (state) => state.sandwich.clearConstructor;
