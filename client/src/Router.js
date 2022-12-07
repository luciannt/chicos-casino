import React from "react";
import "./style/global.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Index from "./views/index";
import Menu from "./views/Menu/Menu";
import GameCode from "./views/_GameCode/GameCode";
import Game from "./components/Game/Game";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game/:code" element={<GameCode />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </main>
  );
};

export default Router;
