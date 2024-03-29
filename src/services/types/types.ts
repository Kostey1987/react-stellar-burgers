import exp from "constants";
import { TBurgerConstructorActions } from "../slices/constructor-slice";
import { TFeedActions } from "../slices/feed-slice";
import { TModalActions } from "../slices/modal-slice";
import { TOrderAction } from "../slices/order-slice";
import { TUserActions } from "../slices/user-slice";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type TItem = {
  id: string;
  ingredient: TIngredientType;
  type: string;
};

export type TIngredientType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  constructorId?: string;
};

export type TConstructorIngredient = TIngredientType & {
  constructorId?: string;
};

export type TDragItem = {
  ingredient: TIngredientType;
};
export type TCollectedProps = {
  isDragging: boolean;
};

export type TError = {
  success?: boolean;
  message?: string;
  status?: number;
};

export type TUserRegister = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  modalState: boolean;
  user: TUserRegister | null;
  isAuthChecked: boolean;
  userData: {
    email: string;
    name: string;
  };
  success: boolean;
  logoutRequest: boolean;
  userRequest: boolean;
  resetConfirmed: boolean;
  resetRequest: boolean;
  changePassword: boolean;
  changePasswordRequest: boolean;
  updateRequest: boolean;
};

export type TUserUpdate = {
  user: string;
  email: string;
  name: string;
};

export type AppActions =
  | TBurgerConstructorActions
  | TUserActions
  | TModalActions
  | TFeedActions
  | TOrderAction;

export type TRefreshData = {
  refreshToken: string;
  success: boolean;
  accessToken: string;
};

export type TOrder = {
  order: {
    number: number | null;
  };
  name: string | null;
};

interface IOrderOwner {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}

export type TOrders = {
  _id: string;
  ingredients: (string | null)[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: IOrderOwner;
};

export type TwsActions = {
  wsConnection: string;
  wsOffline: string;
  wsOpen: string;
  wsError: string;
  wsMessage: string;
  wsClose: string;
};

export type TFeedOrders = {
  success: boolean;
  orders: Array<TOrders>;
  total: number;
  totalToday: number;
};

export type AppThunk = ThunkAction<void, RootState, unknown, AppActions>;
