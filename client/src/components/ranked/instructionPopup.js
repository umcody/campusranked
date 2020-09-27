import React, { useState } from 'react';



export default ()=>{
    const [display,setDisplay] = useState("block");
    
    function exit(){
            setDisplay("none");
    }

    return(
        <div className = "instructionPopUp" style ={{display:display}}>
            <div onClick = {()=>exit()} style = {{ position:"absolute", top:"5px", right:"5px",cursor:"pointer" }}>x</div>
            You can vote up to three times in 24 hours for each category in a school!
        </div>
    )
}