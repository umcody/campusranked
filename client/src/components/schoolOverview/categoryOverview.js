import React from "react";
import CategoryCell from "./categoryCell.js";
import { Link } from "react-router-dom";

function CategoryOverview(props) {
  if (!props.items) {
    return null;
  } else {
    let items = Object.values(props.items);
    console.log(items);

    return (
      <Link to={`/ranked/${props.school}/${props.school + props.category}`}>
        <table className="categoryOverviewContainer">
          <tbody>
            <tr className="header">
              <td>{`${props.category} Overview`}</td>
            </tr>
            {items.map((item) => React.createElement(CategoryCell, [item]))}
          </tbody>
        </table>
      </Link>
    );
  }
}
export default CategoryOverview;
