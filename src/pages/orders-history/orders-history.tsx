import React, { FC, useState } from "react";
import styles from "../orders-history/order-history.module.css";
import { orderList } from "../../utils/data";
import OrderCard from "../../components/order-card/order-card";
import { TOrders } from "../../services/types/types";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "../profile-menu/profile-menu";

export const OrdersHistory: FC = () => {
  const location = useLocation();
  const [orders, setOrders] = useState(orderList);
  console.log("==============================================");
  console.log(orders);

  return (
    <>
      <div className={styles.container}>
        <section className={styles.menuContainer}>
          <ProfileMenu />
        </section>

        <section className={styles.feedContainer}>
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
        </section>
      </div>
    </>
  );
};

export default OrdersHistory;
