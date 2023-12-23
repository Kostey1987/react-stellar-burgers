import React, { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";

function Login() {
  const [password, setPassword] = useState("password");
  const onChange = (e) => {
    setPassword(e.target.password);
  };

  return (
    <>
      <AppHeader />

      <div className={styles.login}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <EmailInput placeholder="E-mail" extraClass="mb-6" />
        <PasswordInput
          onChange={onChange}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button htmlType="button" type="primary" size="medium">
          Войти
        </Button>
        <div className={`${styles.wrapper} mt-20`}>
          <p className="text text_type_main-default text_color_inactive ml-6">
            Вы — новый пользователь?
          </p>
          <Button htmlType="button" type="secondary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <div className={`${styles.wrapper} mt-4`}>
          <p className="text text_type_main-default text_color_inactive ml-2">
            Забыли пароль?
          </p>
          <Button htmlType="button" type="secondary" size="medium">
            Восстановить пароль
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
