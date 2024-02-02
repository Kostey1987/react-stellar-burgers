import orderSliceReducer from "./order-slice";
import { initialState } from "./order-slice";
import { oneOrderFetch } from "../ordersQuery";
import { ordersArray } from "../../utils/data";

describe("Проверка получения заказа orderSliceReduce", () => {
  it("Тест oneOrderFetch.pending", () => {
    const nextState = orderSliceReducer(initialState, oneOrderFetch.pending());
    expect(nextState.fetchRequest).toEqual(true);
  });

  it("Тест oneOrderFetch.fulfilled", () => {
    const action = {
      type: oneOrderFetch.fulfilled.type,
      payload: {
        data: ordersArray,
      },
    };
    const nextState = orderSliceReducer(initialState, action);

    expect(nextState.order).toEqual(action.payload);
    expect(nextState.fetchRequest).toEqual(false);
    expect(nextState.fetchError).toBeNull();
  });

  it("Тест oneOrderFetch.rejected", () => {
    const action = {
      type: oneOrderFetch.rejected.type,
      payload: "Error message",
    };
    const nextState = orderSliceReducer(initialState, action);

    expect(nextState.fetchError).toEqual(action.payload);
    expect(nextState.fetchRequest).toEqual(false);
  });
});
