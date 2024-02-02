import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TError, TFeedOrders } from "../types/types";

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

export const initialState: TFeedState = {
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
  initialState,
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
