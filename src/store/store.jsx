import { configureStore } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import modalReducer from "../services/redusers/modal-slice";
import itemReducer from "../services/redusers/ingredient-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    items: itemReducer,
  },
});
