import React, { useCallback, useState } from "react";
import styles from "./home.module.css";
import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Order from "../../components/order/order";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import { toggleModal } from "../../services/redusers/modal-slice";
import { fetchIngredients } from "../../services/ingredientsQuery";
import {
  selectIngredient,
  clearSelectedIngredient,
} from "../../services/redusers/current-slice";
import { selectedIngredientSelector } from "../../services/selectors/modalSelectors";
import { clearConstructor } from "../../services/redusers/constructor-slice";

function Home() {
  const dispatch = useDispatch();
  const currentIngredient = useSelector(selectedIngredientSelector);
  const currentOrder = useSelector((state) => state.sandwich.order);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  // const handleIngredientClick = React.useCallback(
  //   (item) => {
  //     dispatch(selectIngredient(item));
  //   },
  //   [dispatch]
  // );

  const handleCloseIngredientModal = () => {
    dispatch(clearSelectedIngredient());
  };
  const handleCloseCurrentOrderModal = () => {
    dispatch(clearConstructor());
  };

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <section
          className={styles.ingredients}
          aria-label={`Ингредиенты бутерброда`}
        >
          <h1 className={`text text_type_main-large mt-10 mb-5`}>
            Соберите бургер
          </h1>
          <BurgerIngredients />
        </section>
        <section
          className={styles.ingredients}
          aria-label={`Компоненты бутерброда`}
        >
          <BurgerConstructor />
          <Order />
        </section>
      </main>
      {!!currentIngredient && (
        <Modal onClose={handleCloseIngredientModal}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
      {currentOrder && (
        <Modal onClose={handleCloseCurrentOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default Home;
