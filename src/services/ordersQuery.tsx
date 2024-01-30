import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, saveOrder } from "../utils/api";
import { TError, TFeedOrders, TOrder, TOrders } from "./types/types";

export const postOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: TError }
>("type/postData", async (data) => {
  const res = await saveOrder(data);
  console.log(res);
  return res;
});

export const fetchOrder = createAsyncThunk<
  TFeedOrders,
  string,
  { rejectValue: TError }
>("data/fetchOrder", async function (number, { rejectWithValue }) {
  const response = await getOrders(number);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Error",
    });
  }
  const data: TFeedOrders = await response.json();
  return data;
});

export const orderFetch = createAsyncThunk<
  TOrders,
  string,
  { rejectValue: TError }
>("data/orderFetch", async function (number, { rejectWithValue }) {
  const response = await getOrders(number);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Error",
    });
  }
  const data: TOrders = await response.json();
  return data;
});

// export interface IIngredients {
//   data: TIngredientType[];
// }

// export const getOrderThunk = createAsyncThunk<
//   IIngredients,
//   undefined,
//   { rejectValue: TError }
// >("items/get", async () => {
//   const res = await getOrders();
//   return res;
// });
