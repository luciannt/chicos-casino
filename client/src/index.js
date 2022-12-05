import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CableProvider } from "./context/cable";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CableProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CableProvider>
  </React.StrictMode>
);
