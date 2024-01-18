import { createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "../utils/api";
import { TError, TIngredientType } from "./types/types";

export interface IIngredients {
  data: TIngredientType[];
}

export const fetchIngredients = createAsyncThunk<
  IIngredients,
  undefined,
  { rejectValue: TError }
>("items/get", async () => {
  const res = await getItems();
  return res;
});
