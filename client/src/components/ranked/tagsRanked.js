import React from "react";

function TagsRanked (props){
    return(
        <div className = "tagsRanked" key = {props.key}>
            {`# ${props[0]}`}
        </div>
    )
}

export default TagsRanked;