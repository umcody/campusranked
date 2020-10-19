import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css";
import "./styles/Home.css";
import Footer from "./components/Footer";

const stuff = (
    <BrowserRouter>
      <App />
      {/* <Footer /> */}
    </BrowserRouter>
);
ReactDOM.render(stuff, document.getElementById("root"));
