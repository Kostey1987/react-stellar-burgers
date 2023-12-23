import React, { useState } from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";

import styles from "../forgot-password/forgot-password.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AppHeader />
      <div className={styles.forgot}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Укажите e-mail"}
          extraClass={"mt-6"}
          value={email}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={"mt-6"}
          onSubmit={handleSubmit}
        >
          Вход
        </Button>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Button htmlType="button" type="secondary" size="medium">
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
