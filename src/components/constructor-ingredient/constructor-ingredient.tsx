import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../constructor-ingredient/constructor-ingredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import { changeIngredients } from "../../services/slices/constructor-slice";
// import PropTypes from "prop-types";
// import { ingredientPropType } from "../../utils/prop-types";
import {
  TCollectedProps,
  TDragItem,
  TIngredientType,
} from "../../services/types/types";

interface IProps {
  item: TIngredientType;
  index: number;
  children: ReactElement[];
}

const ConstructorIngredient: FC<IProps> = ({ children, item, index }) => {
  const dispatch = useDispatch();

  const burgerArray = useSelector((state: any) => state.sandwich.ingredients);
  const findIndex = (item: TIngredientType) => {
    return burgerArray.indexOf(item);
  };

  const [{ isDragging }, dragRef] = useDrag<
    TDragItem,
    unknown,
    TCollectedProps
  >({
    type: "sort",
    item: { ingredient: item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TDragItem, unknown, unknown>({
    accept: "sort",
    hover({ ingredient }) {
      if (ingredient.constructorId === item.constructorId) return;
      dispatch(
        changeIngredients({
          indexFrom: findIndex(ingredient),
          indexTo: index,
          ingredient: ingredient,
        })
      );
    },
  });

  return (
    <li
      className={
        styles.container +
        " " +
        "mr-2" +
        " " +
        `${isDragging ? styles.draging : " "}`
      }
      ref={(node) => dropRef(dragRef(node))}
    >
      {children}
    </li>
  );
};

export default React.memo(ConstructorIngredient);
