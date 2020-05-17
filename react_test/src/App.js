import React from "react";
import ReactDOM, { render } from "react-dom";
import data from "./data.json";
import Cell from "./Cell.js";


function App (){
    return(
        <div>
            <table className= "ranked_table">
                <tbody>
                {data.body.map(player => React.createElement(Cell,player))}
                </tbody>
                </table>
                <button id="vote_btn"><a>RANK</a></button>
        </div>
    );
}
export default App;