import React from "react";
import "../styles/homeProto.css";

class HomeProto extends React.Component{
    render(){
        return(
            <div id="protoContainer">
                <div id = "middle">
                    <div>Have The Best Of Your Campus</div>
                    <h6 style = {{"font-size":"14px"}}>Find Students' Favorite Library, Dininghall, And More</h6>
                    <input id = "sampleSearch" placeholder= "Type Your School"></input>
                </div>
                <img id= "char" src ="/asset/open-peeps.png"></img>
                <div id = "backgroundTriangle"></div>
            </div>
        )
    }
}


export default HomeProto;