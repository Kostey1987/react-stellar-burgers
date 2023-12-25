import React, { useRef, useState } from "react";
import styles from "../../pages/profile/profile.module.css";
import { NavLink } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { logout } from "../../utils/api";
import { useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();

  const logoutHandleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const [current, setCurrent] = useState("profile");
  const [name, setName] = useState("Марк");

  // const onClickIcon = () => {
  //   setTimeout(() => inputRef.current.focus(), 0);
  // };

  const [email, setEmail] = useState("e@email.com");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("password");
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const inputRef = useRef(null);

  const isActiveClass = ({ isActive }) =>
    `${styles.link} ${!isActive ? styles.inactive : ""}`;
  return (
    <>
      <AppHeader />
      <div className={styles.profile}>
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
        <div className={`${styles.inputContainer} mt-30 ml-5`}>
          <div className="mt-6">
            <Input
              type="text"
              placeholder={"Имя"}
              onChange={(e) => setName(e.target.value)}
              value={"name"}
              icon={"EditIcon"}
              ref={inputRef}
              // onClickIcon={onClickIcon}
            />
          </div>
          <div className="mt-6">
            <EmailInput
              type="email"
              onChange={changeEmail}
              placeholder={"Логин"}
              value={"e@email.com"}
              icon={"EditIcon"}
            />
          </div>
          <div className="mt-6 mb-6">
            <PasswordInput
              type="password"
              placeholder={"Пароль"}
              onChange={changePassword}
              value={"password"}
              icon={"EditIcon"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
