import React from "react";
import ReactDOM, { render } from "react-dom";
import data from "./data.json";
import Cell from "./Cell.js";


function App (){
    return(
        <table className= "ranked_table">
            <tbody>
            {data.body.map(player => React.createElement(Cell,player))}
            </tbody>
            </table>
    );
}
export default App;