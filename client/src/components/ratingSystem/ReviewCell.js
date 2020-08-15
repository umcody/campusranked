import React from "react";

class ReviewCell extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className = "reviewCell">
                <div id ="username">{this.props[0]}</div>
                <div id ="reviewContent">{this.props[1]}</div>
            </div>
        );
    }
}
export default ReviewCell;