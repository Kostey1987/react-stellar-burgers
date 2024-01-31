import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrder } from "../ordersQuery";
import { TError, TFeedOrders, TOrders } from "../types/types";

export type TFeedState = {
  success: boolean;
  errorMessage: null | undefined | TError;
  wsConnectionStatus: boolean;
  wsError: null | string;
  wsOpen: boolean;
  wsUrl: string;
  fetchError: null | undefined | TError;
  fetchRequest: boolean;
  orders: null | TFeedOrders;
};

export const feedState: TFeedState = {
  success: false,
  errorMessage: null,
  wsUrl: "",
  wsOpen: false,
  wsConnectionStatus: true,
  wsError: null,
  fetchError: null,
  fetchRequest: false,
  orders: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState: feedState,
  reducers: {
    websocketOpen: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = action.payload;
      state.wsError = null;
    },
    websocketClose: (state, action: PayloadAction<boolean>) => {
      state.wsOpen = false;
      state.wsUrl = "";
      state.wsError = null;
      state.orders = null;
    },
    websocketConnection: (state, action: PayloadAction<string>) => {
      state.wsConnectionStatus = true;
      state.wsUrl = action.payload;
    },
    websocketOffline: (state) => {
      state.wsConnectionStatus = false;
    },
    websocketConnectionError: (state, action: PayloadAction<null | string>) => {
      state.wsError = action.payload;
    },
    websocketGetOrders: (state, action: PayloadAction<TFeedOrders>) => {
      state.orders = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchOrder.pending, (state) => {
  //     state.fetchRequest = true;
  //   });
  //   builder.addCase(fetchOrder.fulfilled, (state, action) => {
  //     state.orders = action.payload;
  //     state.fetchRequest = false;
  //     state.fetchError = null;
  //   });
  //   builder.addCase(fetchOrder.rejected, (state, action) => {
  //     state.fetchError = action.payload;
  //     state.fetchRequest = false;
  //   });
  // },
});

export const {
  websocketOpen,
  websocketClose,
  websocketConnection,
  websocketOffline,
  websocketConnectionError,
  websocketGetOrders,
} = feedSlice.actions;

export default feedSlice.reducer;

export type TFeedActionCreators = typeof feedSlice.actions;

export type TFeedActions = ReturnType<
  TFeedActionCreators[keyof TFeedActionCreators]
>;
