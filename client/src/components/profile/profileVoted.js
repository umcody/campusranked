import React from 'react';

function profileVoted(props){
    console.log(props);
    return(
        <div className = "profileVoted">
            {props.title}
        </div>
    )
}

export default profileVoted;