import React, { useCallback, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Order from "../order/order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { modalSelector } from "../../services/selectors/modalSelectors";
import { toggleModal } from "../../services/redusers/modal-slice";
import { fetchIngredients } from "../../services/ingredientsQuery";
import {
  selectIngredient,
  clearSelectedIngredient,
} from "../../services/redusers/current-slice";
import { selectedIngredientSelector } from "../../services/selectors/modalSelectors";

function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(modalSelector);
  const currentIngredient = useSelector(selectedIngredientSelector);

  const ingredients = useSelector((state) => state.items.itemsArray);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const handleClickButton = useCallback(() => dispatch(toggleModal()), []);
  const closeModal = useCallback(() => dispatch(toggleModal()), []);

  const handleIngredientClick = React.useCallback(
    (item) => {
      dispatch(selectIngredient(item));
    },
    [dispatch]
  );

  const handleCloseIngredientModal = () => {
    dispatch(clearSelectedIngredient());
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
            handleIngredientClick={handleIngredientClick}
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
      {!!currentIngredient && (
        <Modal onClose={handleCloseIngredientModal}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
