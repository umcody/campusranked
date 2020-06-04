import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import Fuse from "fuse.js";
import AccountBtn from "./AccountBtn";

const options = {
  includeScore: true,
  keys: ["name"],
};

function SearchBar(props) {
  console.log("props.searchBody");
  console.log(props.searchBody);

  const [dropDown, setDropDown] = useState([]);

  const fuse = new Fuse(props.searchBody, options);

  function handleChange(event) {
    setDropDown(fuse.search(event.target.value));
  }

  return (
    <div className="searchBar">
      <a href="/Home">
        <img
          src="/asset/temp_logo.png"
          className="logo"
          alt="campus ranked logo"
        />
      </a>
      <div className="searchItems">
        <input
          className="search"
          placeholder="Search Any Noun"
          onChange={handleChange}
        ></input>
        {dropDown.map((dropDownItems) =>
          React.createElement(SearchDropDown, dropDownItems)
        )}
      </div>
      <AccountBtn />
    </div>
  );
}
export default SearchBar;
