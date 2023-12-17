import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";

import { hardcodedIngredients, hardcodedBun } from "../../utils/data";

import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { nanoid } from "@reduxjs/toolkit";
import { useDrop } from "react-dnd";

import {
  bun,
  addIngredients,
  clearConstructor,
  delIngredients,
} from "../../services/redusers/constructor-slice";

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
  console.log(ingredients);
  const [{ isDragging }, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      if (item.type === "bun") {
        dispatch(bun(item));
      } else {
        dispatch(addIngredients(item));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  // React.useEffect(() => {
  //   hardcodedIngredients.forEach((item) => {
  //     dispatch(addIngredients(item));
  //   });
  //   dispatch(bun(hardcodedBun));
  // }, [dispatch]);

  return (
    <div
      className={
        `${isDragging ? styles.drop : ""}` +
        " " +
        styles.constructor +
        " mt-25 ml-8 mr-2"
      }
      ref={dropRef}
    >
      <div className={styles.components_container + " ml-10"}>
        {!!buns && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns.name} (верх)`}
            price={buns.price}
            thumbnail={buns.image}
          />
        )}
      </div>
      <ul className={styles.components + " custom-scroll"}>
        {ingredients.length === 0 && (
          <p className={styles.paragraph + " text text_type_main-default"}>
            Выберите ингредиент
          </p>
        )}
        {ingredients.length > 0 &&
          ingredients.map((item, index) => {
            return (
              <ConstructorIngredient
                key={item.constructorId}
                item={item}
                index={index}
              >
                <ConstructorElement
                  text={item.name}
                  thumbnail={item.image}
                  price={item.price}
                  handleClose={() => {
                    dispatch(delIngredients(item));
                  }}
                />
                <DragIcon type="primary" />
              </ConstructorIngredient>
            );
          })}
      </ul>
      <div className={styles.components_container + " ml-10"}>
        {!!buns && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns.name} (низ)`}
            price={buns.price}
            thumbnail={buns.image}
          />
        )}
      </div>
    </div>
  );
}

export default BurgerConstructor;
