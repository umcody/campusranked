import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import Fuse from "fuse.js";

const options = {
  includeScore: true,
  keys: ["name"],
};

function Search(props) {
  console.log(props.searchBody);

  const [dropDown, setDropDown] = useState([]);

  const fuse = new Fuse(props.searchBody, options);

  function handleChange(event) {
    setDropDown(fuse.search(event.target.value));
  }

  return (
      <div className="searchItems">
        <input
          className="search"
          placeholder="Search Any Noun"
          onChange={handleChange}
        ></input>
        <div className = "dropDownContainer">
          {dropDown.map((dropDownItems) =>
            React.createElement(SearchDropDown, dropDownItems)
          )}
        </div>
      </div>
  );
}
export default Search;
