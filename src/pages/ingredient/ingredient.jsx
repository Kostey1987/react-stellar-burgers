import React, { useEffect, useState } from "react";
import styles from "../../pages/ingredient/ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

function Ingredient() {
  const { id } = useParams();

  const itemsArray = useSelector((state) => state.items.itemsArray);

  const item = itemsArray
    ? itemsArray.filter((e) => e._id == id).shift()
    : false;

  return (
    <div className={styles.container}>
      {item && (
        <>
          <IngredientDetails item={item} />
        </>
      )}
    </div>
  );
}

// Ingredient.propTypes = {
//   item: ingredientPropType.isRequired,
// };

export default Ingredient;
