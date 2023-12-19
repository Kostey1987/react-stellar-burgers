import React from "react";
import styles from "./order-details.module.css";
import imgDone from "../../images/done.png";
import { useSelector } from "react-redux";

function OrderDetails() {
  const orderNumber = useSelector((state) => state.sandwich.order);

  return (
    <div className={styles.orderDetails + " " + "mt-30"}>
      <h2 className={styles.orderNumber + " " + "text text_type_digits-large"}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        className={styles.image + " " + "mt-15"}
        src={imgDone}
        alt="Заказ готовится"
      />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
