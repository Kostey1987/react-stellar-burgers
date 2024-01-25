import React, { FC, useCallback, useState } from "react";
import styles from "../order-card/order-card.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrders } from "../../services/types/types";
import { useAppSelector } from "../../hooks/typed-hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
  item: TOrders;
}

const OrderCard: FC<IProps> = ({ item }) => {
  const ingredientsArray = useAppSelector((state) => state.items.itemsArray);

  const orderIngredients = ingredientsArray.filter((ingredient) =>
    item?.ingredients.includes(ingredient._id)
  );

  const overflowingIngredients = orderIngredients.slice(6);

  const totalPrice = orderIngredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return (
    <div className={styles.card + " " + "mb-4"}>
      <div className={styles.orderId}>
        <p
          className={
            styles.orderNumber +
            " " +
            "text text_type_digits-default text_color_primary mt-6 ml-6"
          }
        >
          {"#" + item.number}
        </p>
        <p
          className={`text text_color_inactive text_type_main-default mt-6 mr-6`}
        >
          <FormattedDate date={new Date(item.createdAt)} />
        </p>
      </div>
      <p
        className={
          styles.burgerName +
          " " +
          "text text_type_main-medium text_color_primary ml-6 mt-6"
        }
      >
        {item.name}
      </p>
      <h2
        className={
          styles.status + " " + "text text_type_main-default ml-6 mt-2"
        }
      >
        {item?.status === "done" ? (
          <p className={styles.status_done}>Выполнен</p>
        ) : (
          <p>Готовится</p>
        )}
      </h2>

      <div className={styles.details + " " + "mt-6 mb-6"}>
        <div className={styles.ingredients}>
          <ul className={styles.list}>
            {orderIngredients.slice(0, 6).map((item, index) => (
              <li className={styles.item} key={item._id}>
                <img
                  className={styles.image}
                  src={item.image_mobile}
                  alt={item.name}
                />
                {orderIngredients.length > 6 && 5 == index && (
                  <div
                    className={`${styles.overflow} text text_type_main-default`}
                  >
                    +{overflowingIngredients.length}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
