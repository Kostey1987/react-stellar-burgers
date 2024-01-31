import React, { FC, useEffect } from "react";
import styles from "../order-info/order-info.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { oneOrderFetch } from "../../services/ordersQuery";

export type TId = {
  id: string;
};

const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<TId>();
  const actualId: string = id!;
  const ingredientsArray = useAppSelector((state) => state.items.itemsArray);
  const order = useAppSelector((state) => state.order.order);
  const isUploading = useAppSelector((state) => state.order.fetchRequest);

  useEffect(() => {
    dispatch(oneOrderFetch(actualId));
  }, [dispatch]);

  if (isUploading) {
    return <h2 className={styles.subtitle}>ЗАГРУЗКА</h2>;
  }

  const orderIngredients = ingredientsArray.filter((ingredient) =>
    order?.ingredients.includes(ingredient._id)
  );

  const ingredients = order?.ingredients.map((id) => {
    return ingredientsArray.find((item) => item._id === id);
  });

  if (!order) {
    return null;
  }
  const arrayPrice = order?.ingredients.map((id) => {
    return ingredientsArray.find((item) => item._id === id);
  });

  const totalPrice = arrayPrice?.reduce(function (acc: any, ingredient) {
    return ingredient && acc + ingredient.price;
  }, 0);

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
          <FormattedDate date={new Date(order.createdAt)} />
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
