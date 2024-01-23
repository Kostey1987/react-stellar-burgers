import React, { FC, ReactNode, useCallback, useState } from "react";
import styles from "../feed/feed.module.css";
import { orderList } from "../../utils/data";
import OrderCard from "../../components/order-card/order-card";
import { TOrders } from "../../services/types/types";

export const Feed: FC = () => {
  const [orders, setOrders] = useState(orderList);

  const total = orders?.total;
  const totalToday = orders?.totalToday;

  const orderListWithDoneStatus = orders.orders.filter(
    (order) => order.status == "done"
  );

  const orderListWithOtherStatus = orders.orders.filter(
    (order) => order.status !== "done"
  );

  console.log("----------------------------------------");
  console.log(orderListWithOtherStatus);

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large  ${styles.title} mt-10 mb-5`}>
        Лента заказов
      </h2>
      <div className={styles.main}>
        <section className={styles.feed + " " + " custom-scroll"}>
          {orders.orders.map((item: TOrders) => {
            return <OrderCard item={item} key={item._id} />;
          })}
        </section>

        <section className={styles.board}>
          <div className={styles.box}>
            <div className={`${styles.ready} custom-scroll`}>
              <p
                className={
                  styles.subTitle + " " + "text text_type_main-medium mb-6"
                }
              >
                Готовы:
              </p>
              <ul
                className={
                  styles.number_ready + " " + "text text_type_digits-default"
                }
              >
                {orderListWithDoneStatus.map((orders, index) => {
                  return <li key={orders._id}>{orders.number}</li>;
                })}
              </ul>
            </div>
            <div className={`${styles.work} custom-scroll`}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul
                className={
                  styles.number_work + " " + "text text_type_digits-default"
                }
              >
                {orderListWithOtherStatus.map((orders) => {
                  return <li key={orders._id}>{orders.number}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className={styles.completed}>
            <p className="text text_type_main-medium mt-15">
              Выполнено за все время:
            </p>
            <p className={`${styles.text_box} text text_type_digits-large`}>
              {total}
            </p>
          </div>
          <div className={styles.completed}>
            <p className="text text_type_main-medium mt-15">
              Выполнено за сегодня:
            </p>
            <p className={`${styles.text_box} text text_type_digits-large`}>
              {totalToday}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Feed;
