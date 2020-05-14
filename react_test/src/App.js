import React from "react";
import ReactDOM, { render } from "react-dom";
import data from "./data.json";
import Cell from "./Cell.js";

function App (){
    return(
        <div>{data.body.map(player => React.createElement(Cell,player))}</div>
    );
}
export default App;