import { createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "../utils/api";

export const fetchIngredients = createAsyncThunk("items/get", async () => {
  const res = await getItems();
  console.dir(res);
  return res;
});
