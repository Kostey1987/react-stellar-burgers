import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    selectIngredient(state, action) {
      state.ingredient = action.payload;
    },
    clearSelectedIngredient(state) {
      state.ingredient = initialState;
    },
  },
});

export const { selectIngredient, clearSelectedIngredient } =
  selectedSlice.actions;
export default selectedSlice.reducer;
