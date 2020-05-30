import React from "react";
import "./rateStar.css";

class RateCell extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className = "ratingCell">
                <div>{this.props[0]} : {this.props[1]}</div>
                <div className = "Stars" style={{"--rating":4.2}}></div>
            </div>
        );
    }
}
export default RateCell;