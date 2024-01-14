import React, { useEffect, useState, FC } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../reset-password/reset-password.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { userResetPassword } from "../../services/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.back) {
      navigate("/forgot-password");
    }
  }, [location]);

  const auth = useAppSelector((state) => state.user.changePasswordRequest);

  const [value, setValue] = useState({
    password: "",
    token: "",
  });

  const handleResetPassword = (evt: React.FormEvent) => {
    evt.preventDefault();
    dispatch(userResetPassword(value.password, value.token));
  };

  if (auth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <form onSubmit={handleResetPassword} className={styles.reset}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput
          name={"password"}
          onChange={(evt) => setValue({ ...value, password: evt.target.value })}
          value={value.password}
          extraClass={"mt-6"}
          placeholder={"Введите новый пароль"}
          required={true}
        />
        <Input
          onChange={(evt) => setValue({ ...value, token: evt.target.value })}
          placeholder={"Введите код из письма"}
          extraClass={"mt-6"}
          value={value.token}
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

export default ResetPassword;
