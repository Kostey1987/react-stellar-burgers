import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../services/slices/ingredient-slice";
import selectedReducer from "../services/slices/current-slice";
import constructorReduser from "../services/slices/constructor-slice";
import userSliceReduser from "../services/slices/user-slice";
import modalSliceReduser from "../services/slices/user-slice";
import feedSliceReduser from "../services/slices/feed-slice";
import orderSliceReduser from "../services/slices/order-slice";
import { socketMiddleware } from "../services/middlewares/middlewares";

const wsActions = {
  wsConnection: "feed/websocketConnection",
  wsOffline: "feed/websocketOffline",
  wsOpen: "feed/websocketOpen",
  wsError: "feed/websocketConnectionError",
  wsMessage: "feed/websocketGetOrders",
  wsClose: "feed/websocketClose",
};

export const store = configureStore({
  reducer: {
    items: itemReducer,
    selected: selectedReducer,
    sandwich: constructorReduser,
    feed: feedSliceReduser,
    user: userSliceReduser,
    modal: modalSliceReduser,
    order: orderSliceReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type RootState = ReturnType<typeof store.getState>; //Получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch; //типизацию store.dispatch
