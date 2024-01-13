import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveOrder } from "../utils/api";
import { TError, TOrder } from "./types/types";

export const postOrder = createAsyncThunk<
  TOrder,
  string,
  { rejectValue: TError }
>("type/postData", async (data) => {
  const res = await saveOrder(data);
  return res;
});
