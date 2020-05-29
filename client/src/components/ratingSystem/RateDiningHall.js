import React from "react";
import RateStars from "./RateStars";
import "./rateStar.css";


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
            <div className = "rateContainer">
                <table>
                    <tr><th>Taste: </th><th><RateStars/></th></tr>
                    <tr><th>Hygiene: </th><th><RateStars/></th></tr>
                    <tr><th>Variety: </th><th><RateStars/></th></tr>
                </table>
                
            </div>
        )
    }


}

export default Rate;