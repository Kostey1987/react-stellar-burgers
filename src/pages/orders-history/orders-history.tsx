import React, { FC, ReactNode, useCallback, useState } from "react";
import styles from "../feed/feed.module.css";
import { orderList } from "../../utils/data";
import OrderCard from "../../components/order-card/order-card";
import { TOrders } from "../../services/types/types";
import { Link, useLocation } from "react-router-dom";

export const OrdersHystory: FC = () => {
  const location = useLocation();
  const [orders, setOrders] = useState(orderList);
  console.log("==============================================");
  console.log(orders);

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large  ${styles.title} mt-10 mb-5`}>
        Лента заказов
      </h2>
      <div className={styles.main}>
        <section className={styles.feed + " " + " custom-scroll"}>
          {orders.orders.map((item: TOrders) => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={`/profile/orders/${item._id}`}
                state={{ background: location }}
              >
                <OrderCard item={item} />
              </Link>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default OrdersHystory;
