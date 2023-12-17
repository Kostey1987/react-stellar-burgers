import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const BurgerIngredients = ({ handleIngredientClick }) => {
  // const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = React.useState("one");
  const itemsArray = useSelector((state) => state.items.itemsArray);

  const changeIngredient = (id) => {
    setCurrentTab(id);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const bun = itemsArray.filter((item) => item.type == "bun");
  const suace = itemsArray.filter((item) => item.type == "sauce");
  const main = itemsArray.filter((item) => item.type == "main");

  return (
    <>
      <div className={styles.container}>
        <Tab
          value="one"
          active={currentTab === "one"}
          onClick={changeIngredient}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={currentTab === "two"}
          onClick={changeIngredient}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={currentTab === "three"}
          onClick={changeIngredient}
        >
          Начинки
        </Tab>
      </div>
      <section
        className={styles.ingredients + " " + " custom-scroll" + " " + "mb-10"}
      >
        <h2 id="one" className="text_type_main-medium mt-10">
          Булки
        </h2>
        <div className={styles.list + " " + "mt-6"}>
          {bun.map((item) => {
            return (
              <BurgerIngredient
                handleClickIngredient={handleIngredientClick}
                item={item}
                key={item._id}
              />
            );
          })}
        </div>
        <h2 id="two" className="text_type_main-medium mt-10">
          Соусы
        </h2>
        <div className={styles.list + " " + "mt-6"}>
          {suace.map((item) => {
            return (
              <BurgerIngredient
                handleClickIngredient={handleIngredientClick}
                item={item}
                key={item._id}
              />
            );
          })}
        </div>
        <h2 id="three" className="text_type_main-medium mt-10">
          Начинка
        </h2>
        <div className={styles.list + " " + "mt-6"}>
          {main.map((item) => {
            return (
              <BurgerIngredient
                handleClickIngredient={handleIngredientClick}
                item={item}
                key={item._id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

// BurgerIngredients.propTypes = {
//   handleClickIngredient: PropTypes.func.isRequired,
//   ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
// };

export default BurgerIngredients;
