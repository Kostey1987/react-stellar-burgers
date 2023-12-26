import React, { useCallback, useState } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import styles from "../forgot-password/forgot-password.module.css";
import { Link } from "react-router-dom";
import { reset } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

function ForgotPassword() {
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    email: "",
  });

  const handleReset = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(reset(value.email));
    },
    [dispatch]
  );

  return (
    <>
      <AppHeader />
      <div className={styles.forgot}>
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
          onClick={handleReset}
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
      </div>
    </>
  );
}

export default ForgotPassword;
