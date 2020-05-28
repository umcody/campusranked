import React from "react";
import RateStars from "./RateStars";

class Rate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taste: 0,
            hygiene: 0,
            variety: 0,
            nutrition:0,
            space:0,
            price:0,
            review:""
        }
    }

    render(){
        return(
            <div>
                <RateStars/>
                <RateStars/>
                <RateStars/>
                <RateStars/>
                <RateStars/>
                <RateStars/>
            </div>
        )
    }


}

export default Rate;