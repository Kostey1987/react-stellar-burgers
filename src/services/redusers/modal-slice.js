import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "Modal",
  initialState: {
    modalState: false,
  },
  reducers: {
    toggleModal: (state, action) => {
      state.modalState = !state.modalState;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
