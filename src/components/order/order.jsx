import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIcon from "../../images/icon 36x36.svg";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { modalSelector } from "../../services/selectors/modalSelectors";
import { toggleModal } from "../../services/redusers/modal-slice";
import { postOrder } from "../../services/ordersQuery";

import {
  bunSelector,
  ingredientSelector,
} from "../../services/selectors/modalSelectors";

import { useDispatch, useSelector } from "react-redux";

function Order() {
  const dispatch = useDispatch();

  const buns = useSelector(bunSelector);
  const ingredients = useSelector(ingredientSelector);

  const handleClickButton = () => {
    const orderIds = ingredients.map((i) => i._id);
    orderIds.push(buns._id);

    dispatch(postOrder({ ingredients: orderIds }));

    dispatch(toggleModal());
  };

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
