import React from "react";
import {Link} from "react-router-dom";

function SearchDropDown(props) {
  const schoolName = props.item.name.toLowerCase().replace(/\s/g,"");
  return (
    <div className="searchDropDownItem">
      <Link to={"/schooloverview/"+schoolName}>{props.item.name}</Link>
    </div>
  );
}

export default SearchDropDown;
