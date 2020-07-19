import React from "react";

function overallRatings(props) {
    console.log(props);
    return (
        <div className="overallRatingsContainer">
            {`Overall Score: ${props.ratings}`}
        </div>
    );
}

export default overallRatings;