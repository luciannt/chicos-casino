import React from "react";
import "./style/global.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Index from "./views/index";
import Menu from "./views/Menu/Menu";
import GameCode from "./views/_GameCode/GameCode";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game/:code" element={<GameCode />} />
      </Routes>
    </main>
  );
};

export default Router;
