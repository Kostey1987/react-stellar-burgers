import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveOrder } from "../utils/api";

export const postOrder = createAsyncThunk("type/postData", async (data) => {
  try {
    const res = await saveOrder(data);
    return res;
  } catch (err) {
    console.error(err);
  }
});
