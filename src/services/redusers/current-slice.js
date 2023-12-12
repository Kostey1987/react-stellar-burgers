import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setIngredient(state, action) {
      state.ingredient = action.payload;
    },
  },
  clearIngredient(state) {
    state.ingredient = initialState;
  },
});

export const { setIngredient, clearIngredient } = selectedSlice.actions;
export default selectedSlice.reducer;
