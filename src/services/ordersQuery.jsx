import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveOrder } from "../utils/api";

export const postIngredients = createAsyncThunk("type/postData", async () => {
  try {
    const res = await saveOrder();
    return res;
  } catch (err) {
    console.error(err);
  }
});

export const postOrder = createAsyncThunk(
  "type/postData",
  async (ingredients) => {
    try {
      const res = await saveOrder.post(ingredients);
      return res;
    } catch (err) {
      console.error(err);
    }
  }
);
