import React, { FC, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { userLogin } from "../../services/thunks";
import { useAppDispatch } from "../../hooks/typed-hooks";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("password");
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [email, setEmail] = useState("email");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(userLogin(email, password));
  };

  return (
    <>
      <form onSubmit={onSubmit} className={styles.login}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <EmailInput
          value={email}
          name={"email"}
          placeholder="E-mail"
          extraClass="mb-6"
          onChange={onChangeEmail}
        />
        <PasswordInput
          placeholder="password"
          onChange={onChangePass}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
        <div className={`${styles.wrapper} mt-20`}>
          <p className="text text_type_main-default text_color_inactive ml-6">
            Вы — новый пользователь?
          </p>
          <Link to="/register">
            <Button htmlType="button" type="secondary" size="medium">
              Зарегистрироваться
            </Button>
          </Link>
        </div>
        <div className={`${styles.wrapper} mt-4`}>
          <p className="text text_type_main-default text_color_inactive ml-2">
            Забыли пароль?
          </p>
          <Link to="/forgot-password">
            <Button htmlType="button" type="secondary" size="medium">
              Восстановить пароль
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
