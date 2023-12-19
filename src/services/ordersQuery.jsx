import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveOrder } from "../utils/api";

export const postOrder = createAsyncThunk("type/postData", async (data) => {
  const res = await saveOrder(data);
  return res;
});
