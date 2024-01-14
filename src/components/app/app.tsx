import React, { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "../../pages/home/home";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import NotFound from "../../pages/not-found/not-found";
import Profile from "../../pages/profile/profile";
import Ingredient from "../../pages/ingredient/ingredient";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { checkUserAuth } from "../../utils/utility";
import { useAppDispatch } from "../../hooks/typed-hooks";
import { fetchIngredients } from "../../services/ingredientsQuery";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import { clearSelectedIngredient } from "../../services/slices/current-slice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const background = location.state && location.state?.background;

  const navigate = useNavigate();

  const handleCloseIngredientModal = () => {
    dispatch(clearSelectedIngredient());
    if (background) navigate(background);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  React.useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
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
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseIngredientModal}>
                <Ingredient />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
