import React, { useEffect, useState } from "react";
import styles from "../../pages/ingredient/ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import AppHeader from "../../components/app-header/app-header";
import { useParams } from "react-router";

function Ingredient({ item }) {
  return (
    <>
      <AppHeader />
      <h2 className={styles.title + " " + "text text_type_main-large mt-10"}>
        Детали ингридиента
      </h2>
      <img className={styles.image} src={item.image_large} alt={item.name} />
      <p className={styles.subtitle + " " + "text text_type_main-medium mt-4"}>
        Биокотлета из марсианской магнолии
      </p>
      <div
        className={
          styles.infoContainer + " " + "text text_type_main-medium mt-8 mb-15"
        }
      >
        <div className={styles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.calories}
          </p>
        </div>
        <div className={styles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.proteins}
          </p>
        </div>
        <div className={styles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.fat}
          </p>
        </div>
        <div className={styles.info}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {item.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
}

// Ingredient.propTypes = {
//   item: ingredientPropType.isRequired,
// };

export default Ingredient;
