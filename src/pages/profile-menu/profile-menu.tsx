import React, { FC } from "react";
import styles from "../../pages/profile-menu/profile-menu.module.css";
import { NavLink } from "react-router-dom";

import { userLogout } from "../../services/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();

  const logoutHandleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(userLogout());
  };

  const isActiveClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${!isActive ? styles.inactive : ""}`;
  return (
    <>
      <nav className={`${styles.linkContainer} mt-30 ml-5`}>
        <NavLink to={"/profile"} className={isActiveClass} end>
          <p className="text text_type_main-medium mt-4 mb-4">Профиль</p>
        </NavLink>
        <NavLink to={"/profile/orders"} className={isActiveClass} end>
          <p className="text text_type_main-medium mt-5 mb-4">
            История заказов
          </p>
        </NavLink>
        <NavLink to={"/login"} className={isActiveClass}>
          <p
            onClick={logoutHandleClick}
            className="text text_type_main-medium mt-5 mb-4"
          >
            Выход
          </p>
        </NavLink>
        <p
          className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
        >
          В этом разделе вы можете изменять свои персональные данные
        </p>
      </nav>
    </>
  );
};

export default ProfileMenu;
