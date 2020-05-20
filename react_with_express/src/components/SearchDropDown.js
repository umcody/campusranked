import React from "react";
import {Link} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";

function SearchDropDown(props){

    return(

        <div className = "searchDropDownItem">
                <a href={"/ranked/"+props.item.url}>{props.item.name}</a>
        </div>
    )
}

export default SearchDropDown