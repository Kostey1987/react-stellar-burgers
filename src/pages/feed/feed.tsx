import React, { FC, useEffect } from "react";
import styles from "../feed/feed.module.css";
import OrderCard from "../../components/order-card/order-card";
import { TFeedOrders, TOrders } from "../../services/types/types";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import {
  websocketConnection,
  websocketOffline,
} from "../../services/slices/feed-slice";
import { baseWss } from "../../utils/constants";

export const Feed: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.feed?.orders);

  useEffect(() => {
    dispatch(websocketConnection(`${baseWss}/orders/all`));
    return;
  }, [dispatch]);

  const total = orders?.total;
  const totalToday = orders?.totalToday;

  const orderListWithDoneStatus = orders?.orders.filter(
    (order) => order.status == "done"
  );

  const orderListWithOtherStatus = orders?.orders.filter(
    (order) => order.status !== "done"
  );

  return orders ? (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large  ${styles.title} mt-10 mb-5`}>
        Лента заказов
      </h2>
      <div className={styles.main}>
        <section className={styles.feed + " " + " custom-scroll"}>
          {orders?.orders.map((item: TOrders) => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={`/feed/${item._id}`}
                state={{ background: location }}
              >
                <OrderCard item={item} displayStatus={false} />
              </Link>
            );
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
              <section className={styles.orderBox}>
                <ul
                  className={
                    styles.number_ready +
                    " " +
                    "text text_type_digits-default mr-2"
                  }
                >
                  {orderListWithDoneStatus?.map((orders, index) => {
                    return <li key={orders._id}>{orders.number}</li>;
                  })}
                </ul>
              </section>
            </div>
            <div className={`${styles.work} custom-scroll`}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <ul
                className={
                  styles.number_work + " " + "text text_type_digits-default"
                }
              >
                {orderListWithOtherStatus?.map((orders) => {
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
  ) : (
    <span className={styles.loader + " " + "text text_type_digits-default"}>
      загрузка
    </span>
  );
};

export default Feed;
