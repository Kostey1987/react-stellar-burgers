import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrder, orderFetch } from "../ordersQuery";
import { TError, TFeedOrders, TOrders } from "../types/types";

export type TOrderState = {
  success: boolean;
  fetchError: null | undefined | TError;
  fetchRequest: boolean;
  order: null | TOrders;
};

export const feedState: TOrderState = {
  success: false,
  fetchError: null,
  fetchRequest: false,
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: feedState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderFetch.pending, (state) => {
      state.fetchRequest = true;
    });
    builder.addCase(orderFetch.fulfilled, (state, action) => {
      state.order = action.payload;
      state.fetchRequest = false;
      state.fetchError = null;
    });
    builder.addCase(orderFetch.rejected, (state, action) => {
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
