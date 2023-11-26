import React, { useState } from "react";
import styles from "./app.module.css";
import { data } from "../../utils/data";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Order from "../order/order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getItem } from "../api/api";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [item, setItem] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  React.useEffect(() => {
    getItem(setIngredients);
  }, []);

  const handleClickButton = () => {
    setItem(false);
    setIsModalOpen(!isModalOpen);
  };

  const handleClickIngredient = (item) => {
    setItem(item);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section
          className={styles.ingredients}
          aria-label={`Ингредиенты бутерброда`}
        >
          <h1 className={`text text_type_main-large mt-10 mb-5`}>
            Соберите бургер
          </h1>
          <BurgerIngredients
            ingredients={ingredients}
            handleClickIngredient={handleClickIngredient}
          />
        </section>
        <section
          className={styles.ingredients}
          aria-label={`Компоненты бутерброда`}
        >
          <BurgerConstructor />
          <Order handleClickButton={handleClickButton} />
        </section>
      </main>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {item ? <IngredientDetails item={item} /> : <OrderDetails />}
        </Modal>
      )}
    </div>
  );
}

export default App;
