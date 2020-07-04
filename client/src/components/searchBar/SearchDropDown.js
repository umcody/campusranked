import React from "react";

function SearchDropDown(props) {
  const schoolName = props.item.name.toLowerCase().replace(/\s/g,"");
  return (
    <div className="searchDropDownItem">
      <a href={"/schoolOverView/"+schoolName}>{props.item.name}</a>
    </div>
  );
}

export default SearchDropDown;
