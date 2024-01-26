import React, { FC, useState } from "react";
import styles from "../../pages/profile/profile.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser } from "../../utils/api";
import { update } from "../../services/thunks";
import { useAppDispatch, useAppSelector } from "../../hooks/typed-hooks";

const UpdateProfile: FC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.user.user?.name) ?? "";
  const userEmail = useAppSelector((state) => state.user.user?.email) ?? "";

  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [value, setValue] = useState({
    name: userName,
    email: userEmail,
    password: "",
  });

  React.useEffect(() => {
    setValue({
      name: userName,
      email: userEmail,
      password: "",
    });
  }, [userName, userEmail]);

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(update(value.name, value.email, value.password));
    setValue({
      name: userName,
      email: userEmail,
      password: "",
    });
  };
  const cancelEditing = () => {
    setValue({
      name: userName,
      email: userEmail,
      password: "",
    });
  };
  return (
    <>
      <form onSubmit={updateProfile} className={styles.profile}>
        <div className={`${styles.inputContainer} mt-30 ml-5`}>
          <div className="mt-6">
            <Input
              type="text"
              placeholder={"Имя"}
              onChange={(evt) => setValue({ ...value, name: evt.target.value })}
              value={value.name}
              //   icon={"EditIcon"}
            />
          </div>
          <div className="mt-6">
            <EmailInput
              onChange={(evt) =>
                setValue({ ...value, email: evt.target.value })
              }
              placeholder={"Логин"}
              value={value.email}
              //   icon={"EditIcon"}
            />
          </div>
          <div className="mt-6 mb-6">
            <PasswordInput
              placeholder={"Пароль"}
              onChange={(evt) =>
                setValue({ ...value, password: evt.target.value })
              }
              value={value.password}
              //   icon={"EditIcon"}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
            <Button
              onClick={cancelEditing}
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Отмена
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
