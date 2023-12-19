import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../ingredientsQuery";

const initialState = {
  itemsArray: [],
  isloading: false,
  error: "",
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled.type, (state, action) => {
        state.isLoading = false;
        state.itemsArray = action.payload.data;
        state.error = "";
      })
      .addCase(fetchIngredients.pending.type, (state) => {
        state.isloading = true;
        state.error = "";
      })
      .addCase(fetchIngredients.rejected.type, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { itemsUploading, itemsLoaded, itemsError } = itemSlice.actions;

export default itemSlice.reducer;
