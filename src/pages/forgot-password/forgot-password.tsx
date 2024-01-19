import React, { FC, useCallback, useState } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../forgot-password/forgot-password.module.css";
import { Link, Navigate } from "react-router-dom";
import { userReset } from "../../services/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const success = useAppSelector((state) => state.user.resetConfirmed);

  const [value, setValue] = useState({
    email: "",
  });

  const handleReset = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(userReset(value.email));
  };

  if (success) {
    return (
      <Navigate to="/reset-password" state={{ back: "forgot-password" }} />
    );
  }

  return (
    <>
      <form onSubmit={handleReset} className={styles.forgot}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <EmailInput
          onChange={(evt) => setValue({ ...value, email: evt.target.value })}
          value={value.email}
          name={"email"}
          placeholder={"Укажите e-mail"}
          extraClass={"mt-6"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={"mt-6"}
        >
          Восстановить
        </Button>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login">
            <Button htmlType="button" type="secondary" size="medium">
              Войти
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
