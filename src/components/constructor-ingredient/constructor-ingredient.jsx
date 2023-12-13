import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../constructor-ingredient/constructor-ingredient.module.css";

function ConstructorIngredient({ children }) {
  return <li className={styles.container}>{children}</li>;
}

export default React.memo(ConstructorIngredient);
