import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {},
});
