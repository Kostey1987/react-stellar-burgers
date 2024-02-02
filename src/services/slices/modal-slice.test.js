import { toggleModal, modalSlice } from "./modal-slice";

describe("тест modalSlice", () => {
  it("переключение toggleModal", () => {
    const initialState = { modalState: false };
    const nextState = modalSlice.reducer(initialState, toggleModal());

    expect(nextState.modalState).toBe(true);
  });
});
