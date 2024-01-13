import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../services/slices/modal-slice";
import itemReducer from "../services/slices/ingredient-slice";
import selectedReducer from "../services/slices/current-slice";
import constructorReduser from "../services/slices/constructor-slice";
import userSliceReduser from "../services/slices/user-slice";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    selected: selectedReducer,
    sandwich: constructorReduser,
    user: userSliceReduser,
  },
});
