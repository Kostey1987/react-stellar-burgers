import { orderList } from "../../utils/data";
import feedSliceReducer, {
  initialState,
  websocketOpen,
  websocketClose,
  websocketConnection,
  websocketOffline,
  websocketConnectionError,
  websocketGetOrders,
} from "./feed-slice";

describe("тест feedSlice", () => {
  it("тест websocketOpen", () => {
    initialState;
    const nextState = feedSliceReducer(initialState, websocketOpen(true));

    expect(nextState.wsOpen).toEqual(true);
    expect(nextState.wsError).toBeNull();
  });

  it("тест websocketClose", () => {
    initialState;
    const nextState = feedSliceReducer(initialState, websocketClose());

    expect(nextState.wsOpen).toEqual(false);
    expect(nextState.wsUrl).toEqual("");
    expect(nextState.wsError).toBeNull();
    expect(nextState.orders).toBeNull();
  });

  it("тест websocketConnection", () => {
    initialState;
    const nextState = feedSliceReducer(
      initialState,
      websocketConnection("wss://example.com")
    );

    expect(nextState.wsConnectionStatus).toEqual(true);
    expect(nextState.wsUrl).toEqual("wss://example.com");
  });

  it("тест websocketOffline", () => {
    initialState;
    const nextState = feedSliceReducer(initialState, websocketOffline());

    expect(nextState.wsConnectionStatus).toEqual(false);
  });

  it("тест websocketConnectionError", () => {
    initialState;
    const nextState = feedSliceReducer(
      initialState,
      websocketConnectionError("Connection error")
    );

    expect(nextState.wsError).toEqual("Connection error");
  });

  it("тест websocketGetOrders", () => {
    initialState;
    const nextState = feedSliceReducer(
      initialState,
      websocketGetOrders(orderList)
    );

    expect(nextState.orders).toEqual(orderList);
  });
});
