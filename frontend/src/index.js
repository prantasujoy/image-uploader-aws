import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import UserContextState from "./context/userContextState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextState>
);
