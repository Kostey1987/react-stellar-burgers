import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIngredients } from "../ingredientsQuery";
import { TError, TIngredientType } from "../types/types";

interface IItemState {
  itemsArray: TIngredientType[];
  isLoading: boolean;
  error: TError | undefined;
}

const initialState: IItemState = {
  itemsArray: [],
  isLoading: false,
  error: undefined,
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsArray = action.payload.data;
        state.error = undefined;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

// export const { itemsUploading, itemsLoaded, itemsError } = itemSlice.actions;

export default itemSlice.reducer;

type TItemActions = typeof itemSlice.actions;
