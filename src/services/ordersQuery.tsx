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

export const oneOrderFetch = createAsyncThunk<
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
  const data = await response.json();
  return data.orders[0] as TOrders;
});
