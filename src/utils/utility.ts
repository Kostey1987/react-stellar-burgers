import { ThunkAction } from "@reduxjs/toolkit";
import { setAuthChecked, setUser } from "../services/slices/user-slice";
import { getUser } from "./api";
import { RootState } from "../store/store";
import { AppActions } from "../services/types/types";
// import { checkUser } from "../services/slices/check-slice";

export const checkUserAuth = (): ThunkAction<
  void,
  RootState,
  unknown,
  AppActions
> => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .then((res) => {
          dispatch(setAuthChecked(true));
          dispatch(setUser(res.user));
        })
        .catch((_error) => {
          localStorage.removeItem("accessToken");
          dispatch(setUser(null));
          dispatch(setAuthChecked(false));
        });
      //.finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  };
};
