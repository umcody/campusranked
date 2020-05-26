import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import Footer from "./components/Footer";

const stuff = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>
);
ReactDOM.render(stuff, document.getElementById("root"));
