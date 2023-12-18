import { createSlice } from "@reduxjs/toolkit";

import { postOrder } from "../../services/ordersQuery";

import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "sandwich",
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
      state.order = null;
    },
    changeIngredients: (store, action) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      store.ingredients.splice(indexFrom, 1);
      store.ingredients.splice(indexTo, 0, ingredient);
    },

    delIngredients: (state, action) => {
      state.ingredients = [...state.ingredients].filter(
        (item) => item.constructorId != action.payload.constructorId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.name = action.payload.name;
      state.order = action.payload.order.number;
      // state.error = "";
    });
  },
});

export const {
  bun,
  addIngredients,
  clearConstructor,
  delIngredients,
  changeIngredients,
} = constructorSlice.actions;

export default constructorSlice.reducer;
