/* eslint-disable no-debugger, no-console */
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "bulma/css/bulma.min.css";
import "bulmaswatch/sandstone/bulmaswatch.min.css";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
