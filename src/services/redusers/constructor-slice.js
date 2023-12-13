import { createSlice } from "@reduxjs/toolkit";

import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    bun: {
      prepare: function (item) {
        return {
          payload: { ...item, constructorId: nanoid(12) },
        };
      },
      reducer: function (state, action) {
        state.bun = action.payload;
      },
    },

    addIngredients: {
      prepare: function (item) {
        return {
          payload: { ...item, constructorId: nanoid(12) },
        };
      },
      reducer: function (state, action) {
        state.ingredients.push(action.payload);
      },
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { bun, addIngredients, clearConstructor } =
  constructorSlice.actions;

export default constructorSlice.reducer;
