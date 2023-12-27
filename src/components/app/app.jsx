import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home/home";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import NotFound from "../../pages/not-found/not-found";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from "../../utils/api";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/ingredientsQuery";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/login"} element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path={"/register"}
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path={"/forgot-password"}
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path={"/reset-password"}
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path={"/profile"} element={<OnlyAuth component={<Profile />} />}>
          <Route index element={<Profile />} />
          <Route path={"orders"} element={<NotFound />} />
        </Route>
        <Route path={"/ingredients/:id"} element={<Ingredient />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
