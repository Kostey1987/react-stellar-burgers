import { createSlice } from "@reduxjs/toolkit";

interface IModaltate {
  modalState: boolean;
}

const initialState: IModaltate = {
  modalState: false,
};

export const modalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalState = !state.modalState;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
