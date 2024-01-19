import React, { FC } from "react";
import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Order from "../../components/order/order";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { clearConstructor } from "../../services/slices/constructor-slice";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector((state) => state.sandwich.order);

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
      {currentOrder && (
        <Modal onClose={handleCloseCurrentOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default Home;
