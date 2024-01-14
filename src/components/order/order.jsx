import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIcon from "../../images/icon 36x36.svg";
import { postOrder } from "../../services/ordersQuery";

import {
  bunSelector,
  ingredientSelector,
} from "../../services/selectors/selectors";

import { useNavigate } from "react-router-dom";
import { TIngredientType } from "../../services/types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import { string } from "prop-types";

const Order: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const buns = useAppSelector(bunSelector);
  const ingredients = useAppSelector(
    (state: any) => state.sandwich.ingredients
  );

  const handleClickButton = () => {
    const auth = localStorage.getItem("accessToken");

    if (!auth) {
      navigate("/login");
      return;
    }

    const orderIds = ingredients.map((i: TIngredientType) => i._id);
    orderIds.push(buns._id);
    dispatch(postOrder({ ingredients: orderIds }));
  };

  const totalPrice = React.useMemo(() => {
    return ingredients.reduce(
      (acc: number, curr: TIngredientType) => {
        return acc + curr.price;
      },
      buns ? buns.price * 2 : 0
    );
  }, [ingredients, buns]);

  const isOrderReady = React.useMemo(
    () => !!buns && ingredients.length > 0,
    [ingredients, buns]
  );

  return (
    <div className={styles.order_container}>
      <div className={styles.order}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <img className={styles.icon} src={burgerIcon} alt="burger" />
        <Button
          disabled={!isOrderReady}
          onClick={handleClickButton}
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default Order;
