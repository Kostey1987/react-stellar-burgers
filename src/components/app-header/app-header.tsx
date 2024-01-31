import React, { FC } from "react";
import styles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader: FC = () => {
  return (
    <header className={`${styles.header} m-10 pb-4 pt-4`}>
      <nav className={styles.nav}>
        <NavLink
          to={"/"}
          className={styles.link + " " + "pl-5 pr-5 pb-4 pt-4 mr-2"}
        >
          {({ isActive }) => (
            <>
              <div className={styles.icon + " " + "mr-2"}>
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
              </div>
              <p
                className={`text text_type_main-default ${
                  !isActive ? "" : styles.inActive
                }`}
              >
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink
          to={"/feed"}
          className={styles.link + " " + "pl-5 pr-5 pb-4 pt-4"}
        >
          {({ isActive }) => (
            <>
              <div className={styles.icon + " " + "mr-2"}>
                <ListIcon type={isActive ? "primary" : "secondary"} />
              </div>
              <p
                className={`text text_type_main-default ${
                  !isActive ? "" : styles.inActive
                }`}
              >
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to={"/profile"}
          className={styles.link + " " + "pl-5 pr-5 pb-4 pt-4"}
        >
          {({ isActive }) => (
            <>
              <div className={styles.icon + " " + "mr-2"}>
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
              </div>
              <p
                className={`text text_type_main-default ${
                  !isActive ? "" : styles.inActive
                }`}
              >
                Личный кабинет
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
