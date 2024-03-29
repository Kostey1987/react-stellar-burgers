import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredientType } from "../types/types";

interface ICurrentState {
  ingredient: TIngredientType | null;
}

export const initialState: ICurrentState = {
  ingredient: null,
};

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    selectIngredient(state, action: PayloadAction<TIngredientType>) {
      state.ingredient = action.payload;
    },
    clearSelectedIngredient(state) {
      state.ingredient = null;
    },
  },
});

export const { selectIngredient, clearSelectedIngredient } =
  selectedSlice.actions;
export default selectedSlice.reducer;

export const TSelectedActions = typeof selectedSlice.actions;
