import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");

  const changeIngredient = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex" }}>
      <Tab value="one" active={current === "one"} onClick={changeIngredient}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={changeIngredient}>
        Соусы
      </Tab>
      <Tab
        value="three"
        active={current === "three"}
        onClick={changeIngredient}
      >
        Начинки
      </Tab>
    </div>
  );
};

const BurgerIngredients = ({ ingredients, handleClickIngredient }) => {
  const bun = ingredients.filter((item) => item.type == "bun");
  console.log(bun);
  const suace = ingredients.filter((item) => item.type == "sauce");
  const main = ingredients.filter((item) => item.type == "main");

  return (
    <>
      <Tabs />
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
                handleClickIngredient={handleClickIngredient}
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
                handleClickIngredient={handleClickIngredient}
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
                handleClickIngredient={handleClickIngredient}
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

BurgerIngredients.propTypes = {
  handleClickIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
