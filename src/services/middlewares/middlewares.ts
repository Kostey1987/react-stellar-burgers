import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../../store/store";
import { TwsActions } from "../types/types";

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}> => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = "";

    return (next) => (action) => {
      const { type, payload } = action;
      const { dispatch } = store;
      const { wsConnection, wsOffline, wsOpen, wsError, wsMessage, wsClose } =
        wsActions;

      if (type === wsConnection) {
        url = payload;
        socket = new WebSocket(`${url}`);
      }

      if (type === wsOffline) {
        if (socket) {
          socket.close(1000, `Websocket closed`);
          socket = null;
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsOpen });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsMessage, payload: parsedData });
        };
        socket.onerror = (event) => {
          dispatch({ type: wsError });
        };
        socket.onclose = (event) => {
          dispatch({ type: wsClose, payload: event.code.toString() });
        };
      }

      next(action);
    };
  };
};
