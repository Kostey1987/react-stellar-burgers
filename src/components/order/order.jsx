import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIcon from "../../images/icon 36x36.svg";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

import {
  bunSelector,
  ingredientSelector,
} from "../../services/selectors/modalSelectors";

import { useDispatch, useSelector } from "react-redux";

function Order({ handleClickButton }) {
  const dispatch = useDispatch();

  const buns = useSelector(bunSelector);
  console.log(buns);
  const ingredients = useSelector(ingredientSelector);

  return (
    <div className={styles.order_container}>
      <div className={styles.order}>
        <p className="text text_type_digits-medium mr-2">12 739</p>
        <img className={styles.icon} src={burgerIcon} alt="burger" />
        <Button
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

Order.propTypes = {
  handleClickButton: PropTypes.func.isRequired,
};

export default Order;
