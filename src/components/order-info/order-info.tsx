import React, { FC, useCallback, useState } from "react";
import styles from "../order-info/order-info.module.css";
import { TIngredientType, TOrders } from "../../services/types/types";
import { useAppSelector } from "../../hooks/typed-hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderList } from "../../utils/data";

interface IProps {
  item: TOrders;
  ingredientsArray: TIngredientType;
  orders: TOrders;
}

const OrderInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState(orderList);
  console.log("==============================================");
  console.log(orders);

  const ingredientsArray = useAppSelector((state) => state.items.itemsArray);
  console.log("--------------------------");
  console.log(ingredientsArray);

  // const order = orders
  //   ? orders.filter((e: TOrders) => e._id == id).shift()
  //   : false;

  const order = orders?.orders.find((order) => order._id === id);

  console.log(order);

  const orderIngredients = ingredientsArray.filter((ingredient) =>
    order?.ingredients.includes(ingredient._id)
  );

  const ingredients = order?.ingredients.map((id) => {
    return ingredientsArray.find((item) => item._id === id);
  });

  if (!order) {
    return null;
  }

  const totalPrice = orderIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

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

      <h2 className={styles.status + " " + "text text_type_main-default mt-3"}>
        {order?.status === "done" ? (
          <p className={styles.status_done}>Выполнен</p>
        ) : (
          <p>Готовится</p>
        )}
      </h2>

      <h2 className={styles.title + " " + "text text_type_main-medium mt-6"}>
        Состав:
      </h2>
      <ul className={styles.ingredientBox + " " + " custom-scroll"}>
        {orderIngredients.map((item) => (
          <li className={styles.item} key={item._id}>
            <img
              className={styles.image}
              src={item.image_mobile}
              alt={item.name}
            />
            <p className={styles.paragraph + " " + "text_type_main-default"}>
              {item.name}
            </p>
            <p className={`${styles.price} text text_type_digits-default`}>
              {ingredients?.filter((i) => i?._id === item._id).length} x{" "}
              {item.price} <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.box + " " + "mt-6 mb-6"}>
        <p className={`text text_color_inactive text_type_main-default  mr-2`}>
          <FormattedDate date={new Date()} />
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2 ">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
