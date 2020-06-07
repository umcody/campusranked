import React from "react";
import "../styles/overallRatings.css";

function overallRatings(props) {
    console.log(props);
    return (
        <div className="overallRatingsContainer">
            {`Overall Campus Ranked Score: ${props.ratings}`}
        </div>
    );
}

export default overallRatings;