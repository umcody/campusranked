import React, { useState } from "react";
import SearchDropDown from "./SearchDropDown";
import Fuse from "fuse.js";
import Search from "./Search.js";
import AccountBtn from "./AccountBtn";

const options = {
  includeScore: true,
  keys: ["name"],
};

function SearchBar(props) {
  return (
    <div className="searchBar container row">
      <a href="/home" className = "col-sm-3 col-xs-2">
        <img 
          src="/asset/temp_logo.png"
          className="logo"
          alt="campus ranked logo"
        />
      </a>
      <div className = "col-sm-6 col-xs-10">
        <Search searchBody={props.searchBody}/>
      </div>
      <AccountBtn />
    </div>
  );
}
export default SearchBar;
