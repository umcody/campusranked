import React from "react";
import ReactDOM, { render } from "react-dom";
import Cell from "./Cell.js";

function Component(props){
    return React.createElement(Cell,props);
}

export default Component;