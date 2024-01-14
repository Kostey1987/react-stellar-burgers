import { Navigate, useLocation, RouteProps } from "react-router-dom";
import { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { setAuthChecked } from "../../services/slices/user-slice";
import { checkUserAuth } from "../../utils/utility";

interface ProtectedRouterProps {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected: FC<ProtectedRouterProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthChecked(false));
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuthChecked = useSelector((state: any) => state.user.isAuthChecked);
  const user = useSelector((state: any) => state.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user
  return component;
};

export const OnlyAuth = (
  props: JSX.IntrinsicAttributes &
    ProtectedRouterProps & { children?: React.ReactNode }
) => <Protected onlyUnAuth={false} {...props} />;
export const OnlyUnAuth = (
  props: JSX.IntrinsicAttributes &
    ProtectedRouterProps & { children?: React.ReactNode }
) => <Protected onlyUnAuth={true} {...props} />;
