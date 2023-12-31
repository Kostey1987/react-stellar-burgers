import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../constructor-ingredient/constructor-ingredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import { changeIngredients } from "../../services/redusers/constructor-slice";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

function ConstructorIngredient({ children, item, index }) {
  const dispatch = useDispatch();

  const burgerArray = useSelector((state) => state.sandwich.ingredients);
  const findIndex = (item) => {
    return burgerArray.indexOf(item);
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "sort",
    item: { ingredient: item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
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
}

ConstructorIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
};

export default React.memo(ConstructorIngredient);
