import React from "react";
import ReviewCell from "../ReviewCell.js";
import RateCell from "../RateCell.js";



class RateGym extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: {},
            ratings: [],
            reviews: [],
            category:"",
            hasReview: "none"
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const title = params.title;
        const item = params.item;
        const category = params.category // NOTE this.state.category != this.state.body.category. For now, the former means the actual category, and the latter is the title
        this.setState({category:category});

        const data = await fetch("/api/detailed/" + title + "/" + item);
        const json = await data.json();
        console.log(json);
        this.setState({
            body: json
        })

        const tempRatings = await Object.entries(this.state.body.ratings);
        this.setState({ ratings: tempRatings });
        this.ratings = Math.floor(this.state.body.ratings.overall)
        if (this.state.body.reviews) {
            if(this.state.body.reviews.length === 0){
                this.setState({hasReview:" "});
            }else{
                const tempReview = await Object.entries(this.state.body.reviews);
                console.log(tempReview);
                this.setState({ reviews: tempReview });
            }
        }
    }


    render() {
        if (this.state.body.ratings) {
            return (
                <div className="rateContainer">
                    <div className="leftContainer">
                        <div id="title">{this.state.body.name}</div>
                        <div id="overallRating">Overall : {this.ratings / 100}</div>
                        <div className="ratingsContainer">
                            {this.state.ratings.map(item =>
                                React.createElement(RateCell, item))
                            }
                        </div>
                    </div>
                    <div className="rightContainer">
                    <img  id="itemImage" />
                        <div className="reviewsContainer">
                            {this.state.body.reviews.map((item) =>
                                React.createElement(ReviewCell, item)
                            )}
                        </div>
                        <div style = {{display:this.state.hasReview}}>
                            <ReviewCell {...["","Unfortunately, there is no review yet. Maybe you can write one!"]}/>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <a id="rateBtn" href={`/rate/${this.state.category}/${this.state.body.title}/${this.state.body.name}`}>RATE NOW!</a>
                    </div>
                    <img id = "graphics_review" src="/asset/undraw_char.svg"/>
                </div>
            )
        } else {
            return null;
        }
    }


}

export default RateGym;