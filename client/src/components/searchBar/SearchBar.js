import React, { useState } from "react";
import {Link} from "react-router-dom";
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
      <Link to="/home" className = "col-sm-3 col-xs-2">
        <img 
          src="/asset/temp_logo.png"
          className="logo"
          alt="campus ranked logo"
        />
      </Link>
      <div className = "col-sm-6 col-xs-10">
        <Search searchBody={props.searchBody}/>
      </div>
      <AccountBtn />
    </div>
  );
}
export default SearchBar;
