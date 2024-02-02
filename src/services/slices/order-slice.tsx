import { createSlice } from "@reduxjs/toolkit";
import { oneOrderFetch } from "../ordersQuery";
import { TError, TOrders } from "../types/types";

export type TOrderState = {
  success: boolean;
  fetchError: null | undefined | TError;
  fetchRequest: boolean;
  order: null | TOrders;
};

export const initialState: TOrderState = {
  success: false,
  fetchError: null,
  fetchRequest: false,
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(oneOrderFetch.pending, (state) => {
      state.fetchRequest = true;
    });
    builder.addCase(oneOrderFetch.fulfilled, (state, action) => {
      state.order = action.payload;
      state.fetchRequest = false;
      state.fetchError = null;
    });
    builder.addCase(oneOrderFetch.rejected, (state, action) => {
      state.fetchError = action.payload;
      state.fetchRequest = false;
    });
  },
});

export default orderSlice.reducer;

export type TOrderActionCreators = typeof orderSlice.actions;

export type TOrderAction = ReturnType<
  TOrderActionCreators[keyof TOrderActionCreators]
>;
