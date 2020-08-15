import React from "react";

function CategoryCell(props){
    return(
        <tr className = "categoryCell">
            <th>{props[0].name}</th>
        </tr>
    )
}

export default CategoryCell;