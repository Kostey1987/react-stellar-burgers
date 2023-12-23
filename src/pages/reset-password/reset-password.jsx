import React, { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../reset-password/reset-password.module.css";
import AppHeader from "../../components/app-header/app-header";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AppHeader />
      <div className={styles.reset} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          name={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          extraClass={"mt-6"}
          placeholder={"Введите новый пароль"}
          required={true}
        />
        <Input
          onChange={(e) => setCode(e.target.value)}
          placeholder={"Введите код из письма"}
          extraClass={"mt-6"}
          value={code}
          required={true}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={"mt-6"}
        >
          Сохранить
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

export default ResetPassword;
