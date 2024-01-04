import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIcon from "../../images/icon 36x36.svg";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { postOrder } from "../../services/ordersQuery";

import {
  bunSelector,
  ingredientSelector,
} from "../../services/selectors/modalSelectors";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buns = useSelector(bunSelector);
  const ingredients = useSelector(ingredientSelector);

  const handleClickButton = () => {
    const auth = localStorage.getItem("accessToken");

    if (!auth) {
      // Пользователь не авторизован, перенаправляем на страницу входа
      navigate("/login");
      return;
    }

    const orderIds = ingredients.map((i) => i._id);
    orderIds.push(buns._id);
    dispatch(postOrder({ ingredients: orderIds }));
  };

  const totalPrice = React.useMemo(() => {
    return ingredients.reduce(
      (acc, curr) => {
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
}

export default Order;
