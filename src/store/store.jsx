import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../services/redusers/modal-slice";
import itemReducer from "../services/redusers/ingredient-slice";
import selectedReducer from "../services/redusers/current-slice";
import constructorReduser from "../services/redusers/constructor-slice";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    selected: selectedReducer,
    sandwich: constructorReduser,
  },
});
