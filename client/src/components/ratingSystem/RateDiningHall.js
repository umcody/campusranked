import React from "react";
import "./ratePage.css";
import ReviewCell from "./ReviewCell.js";
import RateCell from "./RateCell.js";



class Rate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: {}
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const title = params.title;
        const item = params.item;

        const data = await fetch("/api/detailed/" + title + "/" + item);
        const json = await data.json();
        this.setState({
            body: json
        })
        console.log(this.state.body);

    }


    render() {
        if (this.state.body.ratings) {
            return (
                <div className="rateContainer">
                    <div className="leftContainer">
                        <div id="title">{this.state.body.name}</div>
                        <div id="overallRating">{this.state.body.ratings[0][0]} : {this.state.body.ratings[0][1]}</div>
                        <div className="ratingsContainer">
                            {this.state.body.ratings.map((item) =>
                                React.createElement(RateCell, item)
                            )}
                        </div>
                    </div>
                    <div className="rightContainer">
                        <img src={this.state.body.image} id="itemImage" />

                        <div className="reviewsContainer">
                            {this.state.body.reviews.map((item) =>
                                React.createElement(ReviewCell, item)
                            )}
                        </div>
                    </div>
                    <div style = {{width:"100%"}}>
                     <button id = "rateBtn">RATE NOW!</button>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }


}

export default Rate;