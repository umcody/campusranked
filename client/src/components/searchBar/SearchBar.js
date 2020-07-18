/*jshint esversion: 6 */
import React, { useState } from "react";
import Search from "./Search.js";
import AccountBtn from "./AccountBtn";

const options = {
  includeScore: true,
  keys: ["name"],
};

function SearchBar(props) {
  return (
    <div className="searchBar">
      <a className="logolink" href="/Home">
        <img
          src="/asset/temp_logo.png"
          className="logo"
          alt="campus ranked logo"
        />
      </a>

      <Search searchBody={props.searchBody} />

      <AccountBtn />
    </div>
  );
}
export default SearchBar;
