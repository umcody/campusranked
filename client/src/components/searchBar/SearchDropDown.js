import React from "react";

function SearchDropDown(props) {
  return (
    <div className="searchDropDownItem">
      <a href={"/ranked/" + props.item.url}>{props.item.name}</a>
    </div>
  );
}

export default SearchDropDown;
