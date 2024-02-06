import React, { FC, useEffect } from "react";
import styles from "../orders-history/order-history.module.css";
import OrderCard from "../../components/order-card/order-card";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "../profile-menu/profile-menu";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import {
  websocketConnection,
  websocketOffline,
} from "../../services/slices/feed-slice";
import { baseWss } from "../../utils/constants";

export const OrdersHistory: FC = () => {
  const location = useLocation();
  const orders = useAppSelector((state) => state.feed?.orders);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(
      websocketConnection(
        `${baseWss}/orders?token=${accessToken?.split(" ")[1]}`
      )
    );
    return () => {
      dispatch(websocketOffline());
    };
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <section className={styles.menuContainer}>
          <ProfileMenu />
        </section>
        <section className={styles.feedContainer}>
          <div className={styles.main}>
            <section className={styles.feed + " " + " custom-scroll"}>
              {orders
                ? [...orders.orders].reverse().map((item) => {
                    return (
                      <Link
                        className={styles.link}
                        key={item.number}
                        to={`/profile/orders/${item.number}`}
                        state={{ background: location }}
                      >
                        <OrderCard item={item} displayStatus={true} />
                      </Link>
                    );
                  })
                : null}
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrdersHistory;
