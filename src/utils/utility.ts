import { setAuthChecked, setUser } from "../services/slices/user-slice";
import { getUser } from "./api";
import { AppThunk } from "../services/types/types";
import { any } from "prop-types";

export const checkUserAuth = (): AppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
          localStorage.removeItem("accessToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
      dispatch(setUser(null));
    }
  };
};
