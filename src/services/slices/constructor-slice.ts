import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { postOrder } from "../ordersQuery";

import { nanoid } from "@reduxjs/toolkit";
import {
  TConstructorIngredient,
  TIngredientType,
  TOrder,
} from "../types/types";
import { orderList } from "../../utils/data";

interface IConstructor {
  bun: TIngredientType | null;
  ingredients: TIngredientType[];
  order: number | null;
  name: string | null;
  number: number | null;
}

interface IDragIngredient {
  indexFrom: number;
  indexTo: number;
  ingredient: TIngredientType;
}

const initialState: IConstructor = {
  order: null,
  bun: null,
  ingredients: [],
  name: null,
  number: null,
};

const constructorSlice = createSlice({
  name: "sandwich",
  initialState,
  reducers: {
    bun: {
      prepare: function (item: TConstructorIngredient) {
        return {
          payload: { ...item, constructorId: nanoid(12) },
        };
      },
      reducer: function (state, action: PayloadAction<TIngredientType>) {
        state.bun = action.payload;
      },
    },

    addIngredients: {
      prepare: function (item: TConstructorIngredient) {
        return {
          payload: { ...item, constructorId: nanoid(12) },
        };
      },
      reducer: function (state, action: PayloadAction<TIngredientType>) {
        state.ingredients.push(action.payload);
      },
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.order = null;
    },
    changeIngredients: (store, action: PayloadAction<IDragIngredient>) => {
      const { indexFrom, indexTo, ingredient } = action.payload;
      store.ingredients.splice(indexFrom, 1);
      store.ingredients.splice(indexTo, 0, ingredient);
    },

    delIngredients: (state, action: PayloadAction<TIngredientType>) => {
      state.ingredients = [...state.ingredients].filter(
        (item) => item.constructorId != action.payload.constructorId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.order = action.payload.order.number;
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

export type TConstructorActionCreators = typeof constructorSlice.actions;

export type TBurgerConstructorActions = ReturnType<
  TConstructorActionCreators[keyof TConstructorActionCreators]
>;
