import React from "react";
import CategoryCell from "./categoryCell.js";
import {Link} from "react-router-dom";

function CategoryOverview(props) {

    if (!props.items) {
        return null;
    } else {

        const categoryLowered = props.category.toLowerCase();
        let items = Object.values(props.items);

        return (
            <Link to = {`/ranked/${props.school}/${props.school+categoryLowered}`}>
                <table className="categoryOverviewContainer">
                    <tbody>
                        <tr className = "header"><td><h5>{`Best ${props.category}`}</h5></td></tr>
                        {items.map((item) => React.createElement(CategoryCell, [item]))}
                    </tbody>
                </table>
            </Link>
        )
    }
}
export default CategoryOverview;