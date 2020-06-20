import React from "react";

function CategoryCell(props){
    console.log("HEY!");
    console.log(props[0].name);
    return(
        <tr className = "categoryCell">
            <th>{props[0].name}</th>
        </tr>
    )
}

export default CategoryCell;