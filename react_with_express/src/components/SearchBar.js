import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import Fuse from "fuse.js";

const options = {
    includeScore: true,
    keys: ['name']
}

function SearchBar(props) {

    const [dropDown, setDropDown] = useState([]);

    const fuse = new Fuse(props.searchBody, options)

    function handleChange(event) {
        setDropDown(fuse.search(event.target.value));
    }



    return (

        <div className="searchBar">
            <img src = "/asset/temp_logo.png" className="logo" alt = "campus ranked logo"/>
                <div className="searchItems">
                    <input className="search" placeholder="Search Any Noun" onChange={handleChange}></input>
                    {dropDown.map(dropDownItems => React.createElement(SearchDropDown, dropDownItems))}
                </div>
        </div>

    );

}
export default SearchBar;