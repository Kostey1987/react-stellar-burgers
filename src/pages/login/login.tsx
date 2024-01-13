import React, { FC, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/thunks";

const Login: FC = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("password");
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [email, setEmail] = useState("email");
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onClick = () => {
    dispatch(userLogin(email, password));
  };

  return (
    <>
      <form onSubmit={onClick} className={styles.login}>
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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onClick}
        >
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

// {
//   "success": true,
//   "user": {
//       "email": "2@a.a",
//       "name": "1"
//   },
//   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODhkZDE4ODc4OTljMDAxYjgyNTQyNyIsImlhdCI6MTcwMzQ2ODMxMiwiZXhwIjoxNzAzNDY5NTEyfQ.Bq8fkSFyQ08l0_jwa92_zX2fSoVasVXT2KoWfvYfJkQ",
//   "refreshToken": "f29fb473a35a6fb9e1a09e7a14d334a1424903798a8362e535c9f2396ed0c59d910f6076ab0bc2c1"
// }
