import React from "react";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className="{$styles.header} m-10 pb-4 pt-4">
      <nav className={styles.nav}>
        <a
          href="#"
          className={
            styles.link +
            " " +
            styles.link_active +
            " " +
            "pl-5 pr-5 pb-4 pt-4 mr-2"
          }
        >
          <div className={styles.icon + " " + "mr-2"}>
            <BurgerIcon type="primary" />
          </div>
          <p className={`text text_type_main-default`}>Конструктор</p>
        </a>
        <a href="#" className={styles.link + " " + "pl-5 pr-5 pb-4 pt-4"}>
          <div className={styles.icon + " " + "mr-2"}>
            <ListIcon type="secondary" />
          </div>
          <p className={`text text_type_main-default`}>Лента заказов</p>
        </a>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={styles.link + " " + "pl-5 pr-5 pb-4 pt-4"}>
          <div className={styles.icon + " " + "mr-2"}>
            <ProfileIcon type="secondary" />
          </div>
          <p className={`text text_type_main-default`}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
};

export default AppHeader;
