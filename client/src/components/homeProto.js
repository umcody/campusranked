import React from "react";
import "../styles/homeProto.css";
import Search from "./searchBar/Search.js"

class HomeProto extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div id="protoContainer">
                <div id = "middle">
                    <div style =
                    {{
                        fontWeight:700
                    }}>Have The Best Of Your Campus</div>
                    <h6 style = {{"fontSize":"14px"}}>Find Students' Favorite Library, Dininghall, And More</h6>
                    <Search searchBody = {this.props.searchBody}/>
                </div>
                <img style = 
                {{
                    width:"100%",
                    position:"absolute",
                    bottom:"-10px",
                    left:0,
                    opacity:0.95
                }}
                src = "/asset/campusranked.svg"/>

                {/*<div id = "backgroundTriangle"></div>*/}
            </div>
        )
    }
}


export default HomeProto;