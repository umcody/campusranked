import React from "react";
//import image from "../public/asset/kobeBryant.jpg";

function Cell (props){

    return (
    <tr className = "row">
        <th>1</th>
        <th>
            <div className = "image_border">
                <img src= {props.image} className = "profile_pic" alt="" />
            </div></th>
        <th><div className = "name">{props.name}</div></th>
        <th>
            <a className = "upVote">🔺</a>
            <a className = "downVote">🔻</a>
        </th>
        <th className = "count">{props.count}</th>
    </tr>
    );
}

export default Cell;