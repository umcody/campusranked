import React from "react";
import ReviewCell from "../ReviewCell.js";
import RateCell from "../RateCell.js";
import Tags from "../../ranked/tagsRanked.js";
import {Link} from "react-router-dom";



class RateGym extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: {},
            ratings: [],
            reviews: [],
            category: "",
            hasReview: "none",
            tags: [],
            tagsContainerClass: "" // DOES NOTHING FOR NOW
        }
    }

    sortAndConvertTags(tags) {
        tags = Object.entries(tags);
        tags = tags.sort(function (a, b) { return b[1] - a[1] });
        this.setState({ tags: tags, tagsContainerClass: "tagsContainer" });
        console.log(tags);
    }


    async componentDidMount() {
        const { match: { params } } = this.props;
        const title = params.title;
        const item = params.item;
        const category = params.category // NOTE this.state.category != this.state.body.category. For now, the former means the actual category, and the latter is the title
        this.setState({ category: category });

        const data = await fetch(`/api/detailed/${this.props.match.params.school}/${title}/${item}`);
        const json = await data.json();
        console.log(json);
        this.setState({
            body: json
        })

        document.title = `CampusRanked - Review ${this.state.body.name}`


        const tempRatings = Object.entries(this.state.body.ratings);
        this.setState({ ratings: tempRatings });
        this.ratings = Math.floor(this.state.body.ratings.overall);
        if (this.state.body.reviews) {
            if (this.state.body.reviews.length === 0) {
                this.setState({ hasReview: " " });
            } else {
                const tempReview = Object.entries(this.state.body.reviews);
                console.log(tempReview);
                this.setState({ reviews: tempReview });
            }
        }

        // If tag exists, update the state to display it
        if (this.state.body.tags !== undefined) {
            this.sortAndConvertTags(this.state.body.tags);
        }
    }


    render() {
        if (this.state.body.ratings) {
            return (
                <div className = "onePage">
                    <div className="rateContainer container row">
                        <div className="col-sm-6">
                            <div id="title" style={{ "maxWidth": "600px" }}>{this.state.body.name}</div>
                            <div>
                                {this.state.tags.slice(0, 5).map((tag) =>
                                    React.createElement(Tags, [tag[0]])
                                )}
                            </div>
                            <div id="overallRating">Overall : {this.ratings / 100}</div>
                            <div className="ratingsContainer">
                                {this.state.ratings.map(item =>
                                    React.createElement(RateCell, item))
                                }
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img id="itemImage" src={this.state.body.image} />
                            <div className="reviewsContainer">
                                {this.state.body.reviews.map((item) =>
                                    React.createElement(ReviewCell, item)
                                )}
                            </div>
                            <div style={{ display: this.state.hasReview }}>
                                <ReviewCell {...["", "Unfortunately, there is no review yet. Maybe you can write one!"]} />
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <Link id="rateBtn" to={`/rate/${this.state.category}/${this.props.match.params.school}/${this.state.body.title}/${this.state.body.name}`}>RATE NOW!</Link>
                        </div>
                        <img id="graphics_review" src="/asset/undraw_char.svg" />
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }


}

export default RateGym;