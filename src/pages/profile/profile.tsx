import React, { FC, useState } from "react";
import styles from "../../pages/profile/profile.module.css";
import { NavLink } from "react-router-dom";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../utils/api";
import { update, userLogout } from "../../services/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.user.name);
  const userEmail = useAppSelector((state) => state.user.user.email);

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [value, setValue] = useState({
    name: userName,
    email: userEmail,
    password: "",
  });

  React.useEffect(() => {
    setValue({
      name: userName,
      email: userEmail,
      password: "",
    });
  }, [userName, userEmail]);

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(update(value.name, value.email, value.password));
    setValue({
      name: userName,
      email: userEmail,
      password: "",
    });
  };

  const logoutHandleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(userLogout());
  };

  const cancelEditing = () => {
    setValue({
      name: userName,
      email: userEmail,
      password: "",
    });
  };

  const isActiveClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${!isActive ? styles.inactive : ""}`;
  return (
    <>
      <form onSubmit={updateProfile} className={styles.profile}>
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
              onChange={(evt) => setValue({ ...value, name: evt.target.value })}
              value={value.name}
              icon={"EditIcon"}
            />
          </div>
          <div className="mt-6">
            <EmailInput
              onChange={(evt) =>
                setValue({ ...value, email: evt.target.value })
              }
              placeholder={"Логин"}
              value={value.email}
              // icon={"EditIcon"}
            />
          </div>
          <div className="mt-6 mb-6">
            <PasswordInput
              placeholder={"Пароль"}
              onChange={(evt) =>
                setValue({ ...value, password: evt.target.value })
              }
              value={value.password}
              // icon={"EditIcon"}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
            <Button
              onClick={cancelEditing}
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Отмена
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;
