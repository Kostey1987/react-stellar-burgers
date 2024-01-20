import React, { FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { nanoid } from "@reduxjs/toolkit";
import { useDrop } from "react-dnd";

import {
  bun,
  addIngredients,
  delIngredients,
} from "../../services/slices/constructor-slice";

import {
  bunSelector,
  ingredientSelector,
} from "../../services/selectors/selectors";
import {
  TConstructorIngredient,
  TIngredientType,
  TItem,
} from "../../services/types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const buns = useAppSelector(bunSelector);
  const ingredients = useAppSelector(ingredientSelector);

  const [{ isDragging }, dropRef] = useDrop({
    accept: "ingredient",
    drop: (item: TConstructorIngredient) => {
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
      <div className={styles.components_container + " ml-8"}>
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
          ingredients.map((item: TIngredientType, index: number) => {
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
      <div className={styles.components_container + " ml-8"}>
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
};

export default BurgerConstructor;
