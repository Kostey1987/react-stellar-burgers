import React from "react";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { memo } from "react";
import { useSelector } from "react-redux";

const BurgerIngredient = memo(function BurgerIngredient({
  item,
  handleClickIngredient,
  onDrag,
}) {
  // const onDragStart = () => {
  //   onDrag(item);
  // };

  const { ingredients, bun } = useSelector((state) => state.constructor_slice);
  const count = React.useMemo(() => {
    if (item.type === "bun") {
      return !!bun && bun._id === item._id ? 1 : 0;
    } else {
      return ingredients.filter((el) => el._id === item._id).length;
    }
  }, [ingredients, bun]);
  return (
    <div
      className={styles.card}
      onClick={() => handleClickIngredient(item)}
      // draggable
      // onDragStart={onDragStart}
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

// BurgerIngredient.propTypes = {
//   item: ingredientPropType.isRequired,
//   handleClickIngredient: PropTypes.func.isRequired,
// };

export default BurgerIngredient;
