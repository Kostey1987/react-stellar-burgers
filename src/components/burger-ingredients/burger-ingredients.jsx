import React, { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = ({ handleIngredientClick }) => {
  const itemsArray = useSelector((state) => state.items.itemsArray);
  const baseRef = useRef();
  const bunsRef = useRef();
  const soucesRef = useRef();
  const mainsRef = useRef();

  const handleScrollToBuns = () => {
    bunsRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToSouses = () => {
    soucesRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToMains = () => {
    mainsRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const [bunsMonitorRef, isBunsInView] = useInView({
    root: baseRef.current,
    threshold: 0.5,
  });
  const [soucesMonitorRef, isSoucesInView] = useInView({
    root: baseRef.current,
    threshold: 0.8,
  });
  const [mainsMonitorRef, isMainsInView] = useInView({ root: baseRef.current });

  const bun = itemsArray.filter((item) => item.type == "bun");
  const suace = itemsArray.filter((item) => item.type == "sauce");
  const main = itemsArray.filter((item) => item.type == "main");

  return (
    <>
      <div className={styles.container}>
        <Tab value="one" active={isBunsInView} onClick={handleScrollToBuns}>
          Булки
        </Tab>
        <Tab
          value="two"
          active={isSoucesInView && !isBunsInView}
          onClick={handleScrollToSouses}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={isMainsInView && !isSoucesInView}
          onClick={handleScrollToMains}
        >
          Начинки
        </Tab>
      </div>
      <section
        className={styles.ingredients + " " + " custom-scroll" + " " + "mb-10"}
        ref={baseRef}
      >
        <h2 id="buns" className="text_type_main-medium mt-10" ref={bunsRef}>
          Булки
        </h2>
        <div className={styles.list + " " + "mt-6"} ref={bunsMonitorRef}>
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
        <h2 id="souces" className="text_type_main-medium mt-10" ref={soucesRef}>
          Соусы
        </h2>
        <div className={styles.list + " " + "mt-6"} ref={soucesMonitorRef}>
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
        <h2 id="mains" className="text_type_main-medium mt-10" ref={mainsRef}>
          Начинка
        </h2>
        <div className={styles.list + " " + "mt-6"} ref={mainsMonitorRef}>
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

BurgerIngredients.propTypes = {
  handleIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
