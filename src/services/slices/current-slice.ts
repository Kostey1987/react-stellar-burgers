import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredientType, TItem } from "../types/types";

interface ICurrentState {
  ingredient: TIngredientType | null;
}

const initialState: ICurrentState = {
  ingredient: null,
};

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    selectIngredient(state, action: PayloadAction<ICurrentState>) {
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
