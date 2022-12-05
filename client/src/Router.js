import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Index from "./views/index";
import Menu from "./views/Menu/Menu";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </main>
  );
};

export default Router;
