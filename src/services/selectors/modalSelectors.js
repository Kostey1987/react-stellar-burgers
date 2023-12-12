export const modalSelector = (state) => state.modal.modalState;

export const getItemsSelector = (state) => {
  return state.items.itemsArray;
};

export const selectedIngredientSelector = (state) => state.selected.ingredient;
