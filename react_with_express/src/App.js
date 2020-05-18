import React from "react";
import Ranked from "./Ranked.js"
import { Route } from "react-router-dom";



class App extends React.Component{
    render(){
        return(
            <Route path = "/ranked" component ={Ranked}></Route>
        );
    }
}

export default App;