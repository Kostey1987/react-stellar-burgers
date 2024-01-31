import React, { FC } from "react";
import styles from "../../pages/ingredient/ingredient.module.css";
import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { TIngredientType } from "../../services/types/types";
import { useAppSelector } from "../../hooks/typed-hooks";

const Ingredient: FC = () => {
  const { id } = useParams();
  console.log(id);

  const itemsArray = useAppSelector((state) => state.items.itemsArray);

  const item = itemsArray
    ? itemsArray.filter((i) => i._id == id).shift()
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
};

export default Ingredient;
