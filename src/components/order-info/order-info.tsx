import React, { FC, useCallback, useState } from "react";
import styles from "../order-info/order-info.module.css";
import { TOrders } from "../../services/types/types";
import { orderList } from "../../utils/data";
import { useAppSelector } from "../../hooks/typed-hooks";
import { useParams } from "react-router-dom";
// interface IProps {
//   item: TOrders;
// }

const OrderInfo: FC = () => {
  const [orders, setOrders] = useState(orderList);
  const ingredientsArray = useAppSelector((state) => state.items.itemsArray);

  const { id } = useParams<{ id: string }>();

  const order = orders?.orders.find((order) => order._id === id);

  return (
    <div className={styles.container}>
      <p
        className={styles.orderNumber + " " + " text text_type_digits-default"}
      >
        {"#" + order?.number}
      </p>
      <p
        className={styles.burgerName + " " + "text text_type_main-medium mt-10"}
      >
        {order?.name}
      </p>
      <p className={styles.status + " " + "text text_type_main-default mt-3"}>
        {order?.status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <p className={`${styles.title} text text_type_main-medium mt-15`}>
        Состав:
      </p>
    </div>
  );
};

export default OrderInfo;
