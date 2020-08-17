import React from "react";


class RateCell extends React.Component {
    constructor(props) {
        super(props);
        this.ratings = Math.floor(props[1])
    }
    render() {
        return (
            <div className = "ratingCell">
                <div>{this.props[0]} : {this.ratings/100}</div>
                <div className = "Stars" style={{"--rating":this.ratings/100}}></div>
            </div>
        );
    }
}
export default RateCell;