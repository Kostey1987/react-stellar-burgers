import React from "react";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { memo } from "react";

const BurgerIngredient = memo(function BurgerIngredient({
  item,
  handleIngredientClick,
}) {
  return (
    <div className={styles.card} onClick={() => handleIngredientClick(item)}>
      <div className={styles.counter}>
        <Counter count={1} size="default" />
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
