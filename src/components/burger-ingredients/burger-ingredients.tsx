import React, { FC, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import { TIngredientType } from "../../services/types/types";
import { useAppSelector } from "../../hooks/typed-hooks";

const BurgerIngredients: FC = () => {
  const itemsArray = useAppSelector((state) => state.items.itemsArray);
  const location = useLocation();

  const baseRef = useRef<HTMLParagraphElement>(null);
  const bunsRef = useRef<HTMLParagraphElement>(null);
  const soucesRef = useRef<HTMLParagraphElement>(null);
  const mainsRef = useRef<HTMLParagraphElement>(null);

  const handleScrollToBuns = () => {
    bunsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToSouses = () => {
    soucesRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToMains = () => {
    mainsRef?.current!.scrollIntoView({ behavior: "smooth" });
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

  const bun = itemsArray.filter((item: TIngredientType) => item.type == "bun");
  const suace = itemsArray.filter(
    (item: TIngredientType) => item.type == "sauce"
  );
  const main = itemsArray.filter(
    (item: TIngredientType) => item.type == "main"
  );

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
          {bun.map((item: TIngredientType) => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
              >
                <BurgerIngredient item={item} />
              </Link>
            );
          })}
        </div>
        <h2 id="souces" className="text_type_main-medium mt-10" ref={soucesRef}>
          Соусы
        </h2>
        <div className={styles.list + " " + "mt-6"} ref={soucesMonitorRef}>
          {suace.map((item: TIngredientType) => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
              >
                <BurgerIngredient item={item} />
              </Link>
            );
          })}
        </div>
        <h2 id="mains" className="text_type_main-medium mt-10" ref={mainsRef}>
          Начинка
        </h2>
        <div className={styles.list + " " + "mt-6"} ref={mainsMonitorRef}>
          {main.map((item: TIngredientType) => {
            return (
              <Link
                className={styles.link}
                key={item._id}
                to={`/ingredients/${item._id}`}
                state={{ background: location }}
              >
                <BurgerIngredient item={item} />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
