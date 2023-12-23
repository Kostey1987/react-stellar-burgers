import React, { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AppHeader />
      <div className={styles.register}>
        <h2 className={`${styles.header} text text_type_main-medium mb-6`}>
          Регистрация
        </h2>
        <div>
          <Input
            onChange={(e) => setUserName(e.target.value)}
            placeholder={"Имя"}
            extraClass={"mb-6"}
            value={userName}
            required={true}
          />

          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            extraClass={"mb-6"}
            value={email}
            required={true}
          />
          <PasswordInput
            name={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            extraClass={"mb-6"}
            required={true}
          />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
        <div className={styles.wrapper}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Button htmlType="button" type="secondary" size="medium">
            Войти
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register;
