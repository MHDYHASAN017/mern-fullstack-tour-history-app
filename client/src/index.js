import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import MainCtxProvider from "./Context/MainCtx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainCtxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MainCtxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
