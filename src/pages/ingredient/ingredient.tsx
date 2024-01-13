import React, { FC, useEffect, useState } from "react";
import styles from "../../pages/ingredient/ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { TIngredientType } from "../../services/types/types";

function Ingredient() {
  const { id } = useParams();
  console.log(id);

  const itemsArray = useSelector((state: any) => state.items.itemsArray);

  const item = itemsArray
    ? itemsArray.filter((e: TIngredientType) => e._id == id).shift()
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
