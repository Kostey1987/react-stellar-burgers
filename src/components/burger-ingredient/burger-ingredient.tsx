import React, { FC } from "react";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo } from "react";
import { useDrag } from "react-dnd";
import { TIngredientType } from "../../services/types/types";
import { selectIngredient } from "../../services/slices/current-slice";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

interface IProps {
  item: TIngredientType;
}

const BurgerIngredient: FC<IProps> = memo(function BurgerIngredient({ item }) {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleIngredientClick = React.useCallback(
    (item: TIngredientType) => {
      dispatch(selectIngredient(item));
    },
    [dispatch]
  );

  const { ingredients, bun } = useAppSelector((state) => state.sandwich);
  const count = React.useMemo(() => {
    if (item.type === "bun") {
      return !!bun && bun._id === item._id ? 1 : 0;
    } else {
      return ingredients.filter((el: TIngredientType) => el._id === item._id)
        .length;
    }
  }, [ingredients, bun]);
  return (
    <div
      className={`${isDragging ? styles.opacity : styles.card}`}
      onClick={() => handleIngredientClick(item)}
      ref={dragRef}
    >
      <div className={styles.counter}>
        <Counter count={count} size="default" />
      </div>
      <img className={styles.image} src={item.image} alt={item.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </div>
  );
});

export default BurgerIngredient;
