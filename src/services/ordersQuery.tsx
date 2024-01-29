import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, saveOrder } from "../utils/api";
import { TError, TFeedOrders, TOrder } from "./types/types";

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
>("data/onFetchOrder", async function (number, { rejectWithValue }) {
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
