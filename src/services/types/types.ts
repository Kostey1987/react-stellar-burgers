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
  constructorId: string;
};

export type TConstructorIngredient = TIngredientType & {
  constructorId: string;
};

export type TDragItem = {
  ingredient: TIngredientType;
};
export type TCollectedProps = {
  isDragging: boolean;
};

export type TOrder = {
  order: {
    number: number | null;
  };
  name: string | null;
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
  user: TUserRegister;
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

export type TActionTypes = {};
