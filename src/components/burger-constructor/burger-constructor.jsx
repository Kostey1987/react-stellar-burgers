import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";

import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

import {
  bunSelector,
  ingredientSelector,
  clearSelector,
} from "../../services/selectors/modalSelectors";

function BurgerConstructor({ item }) {
  const dispatch = useDispatch();
  const buns = useSelector(bunSelector);

  console.log(buns);
  const ingredients = useSelector(ingredientSelector);

  return (
    <div className={styles.constructor + " mt-25 ml-8 mr-2"}>
      <div className={styles.components_container}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${buns.name} (верх)`}
          price={buns.price}
          thumbnail={buns.image}
        />
      </div>
      <ul className={styles.components + " custom-scroll"}>
        {ingredients.map((item) => {
          return (
            <ConstructorIngredient>
              <ConstructorElement
                key={item.consructorId}
                text={item.name}
                thumbnail={item.image}
                price={item.price}
                handleClose={() => {}}
              />
              <DragIcon type="primary" />
            </ConstructorIngredient>
          );
        })}
      </ul>
      <div className={styles.components_container}>
        {/* <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
        /> */}
      </div>
    </div>
  );
}

export default BurgerConstructor;
