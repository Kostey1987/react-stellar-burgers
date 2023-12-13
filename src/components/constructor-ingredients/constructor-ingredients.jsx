import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../components/burger-constructor/burger-constructor.module.css";

function ConstructorIngredients({ item }) {
  return (
    <div className={styles.container}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        thumbnail={item.image}
        price={item.price}
        handleClose={() => {}}
      />
    </div>
  );
}

export default ConstructorIngredients;
