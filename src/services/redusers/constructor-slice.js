import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    bun(state, action) {
      state.bun = action.payload;
    },
    addIngredients(state, action) {
      state.ingredients.push(action.payload);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { bun, addIngredients, clearConstructor } =
  constructorSlice.reducer;
