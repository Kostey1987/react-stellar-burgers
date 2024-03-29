import React, { FC } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { userRegister } from "../../services/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const handleRegister = (evt: React.FormEvent) => {
    evt.preventDefault();
    const user = {
      name: value.name,
      email: value.email,
      password: value.password,
    };
    dispatch(userRegister(user));
  };

  return (
    <>
      <form className={styles.main} onSubmit={handleRegister}>
        <div className={styles.register}>
          <h2 className={`${styles.header} text text_type_main-medium mb-6`}>
            Регистрация
          </h2>
          <div>
            <Input
              name={"name"}
              type={"text"}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              placeholder={"Имя"}
              extraClass={"mb-6"}
              value={value.name}
              required={true}
            />

            <EmailInput
              name={"email"}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              extraClass={"mb-6"}
              value={value.email}
              required={true}
            />
            <PasswordInput
              name={"password"}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              value={value.password}
              extraClass={"mb-6"}
              required={true}
              placeholder={"Пароль"}
            />
          </div>
          <Button
            htmlType="submit"
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
            <Link to="/login">
              <Button htmlType="button" type="secondary" size="medium">
                Войти
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
