import React, { useState,useRef, useEffect } from "react";
import SearchDropDown from "./SearchDropDown";
import Fuse from "fuse.js";

const options = {
  includeScore: true,
  keys: ["name"],
};

function Search(props) {
  console.log(props.searchBody);
  
  /*useEffect(()=>{
    input.current.value = "";
  });
  */
  const [dropDown, setDropDown] = useState([]);
  const input = useRef(null);
  const [dropDownClosed, setDropDownClosed] = useState("");
  const [blockerClosed, setBlockerClosed] = useState("none");
  const fuse = new Fuse(props.searchBody, options);

  function handleChange(event) {
    setBlockerClosed("");
    setDropDownClosed("");
    setDropDown(fuse.search(event.target.value));
  }

  function blockerClicked(event){
    setDropDownClosed("none");
    setBlockerClosed("none");
  }


  return (
      <div className="searchItems">
        <input
          className="search"
          placeholder="Search Any Noun"
          onChange={handleChange}
          ref = {input}
        ></input>
        <div className = "dropDownContainer" style ={{display:dropDownClosed}}>
          {dropDown.map((dropDownItems) =>
            React.createElement(SearchDropDown, dropDownItems)
          )}
        </div>
        <div onClick = {blockerClicked}style = {{top:"0px",left:"0px",position:"fixed",width:"100%",height:"100%",display:blockerClosed, zIndex:-1}}></div>
        {/*<div onClick = {close} style ={{top:"0px", left:"0px",position:"fixed", width:"100%",height:"100%"}}></div>*/}
      </div>
  );
}
export default Search;
