import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: [],
};

const selectedSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setIngredient(state, action) {
      state.ingredient = action.payload;
      state.error = "";
    },
  },
  clearIngredient(state) {
    state.ingredient = initialState;
  },
});

export const { setIngredient, clearIngredient } = selectedSlice.actions;
export default selectedSlice.reducer;
