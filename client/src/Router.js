import React from "react";
import "./style/global.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Menu from "./views/Menu/Menu";
import GameCode from "./views/_GameCode/GameCode";
import Game from "./components/Game/Game";
import Home from "./views/Home/Home";
import Leaderboard from "./views/Leaderboard/Leaderboard";
import Contact from "./views/Contact/Contact";
import Signup from "./views/Signup/Signup";
import Settings from "./views/Settings/Settings";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game/:code" element={<GameCode />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </main>
  );
};

export default Router;
