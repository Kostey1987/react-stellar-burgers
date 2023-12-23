import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/test1"} element={<Home />}></Route>
        <Route path={"/test2"} element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
