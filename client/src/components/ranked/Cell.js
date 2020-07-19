import React from "react";
import ReactDOM from "react-dom";
import posed from "react-pose";
import rateStar from "../ratingSystem/RateStars";
import Tags from "./tagsRanked.js"
//import image from "../public/asset/kobeBryant.jpg";


// VOTE ANIMATION USING POSE JS
const Vote = posed.div({
    hidden: { left: "0px" },
    visible: {
        left: "-75px",
        transition: {
            width: { ease: "easeInAndOut", duration: 200 }
        }
    }
});

class Cell extends React.Component {

    // CONSTRUCTOR and Initializes the STATE.
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isVisible1: false,
            count: props[0].count,
            clicked: false,
            clickCount: 0,
            hasRatings: "none",
            tags:[],
            tagsContainerClass: "",
        }
        this.controlVote = this.controlVote.bind(this);

    }

    // vote CLICKED HANDLER to Toggle animation 
    controlVote(count) {
        if (count === 1) {
            this.setState({
                isVisible: true
            });
        } else if (count === 2) {
            this.setState({
                isVisible1: true
            });
        }
    }

    //Convert tag objects to Array, sort them, and set state
    sortAndConvertTags(tags){
            tags = Object.entries(tags);
            tags = tags.sort(function(a, b){return b[1] - a[1]});
            this.setState({tags: tags, tagsContainerClass: "tagsContainer"});
    }


    // POSTS to Server that the item is voted
     componentDidMount() {
        const current = ReactDOM.findDOMNode(this);
        let button = current.querySelector(".upVote");
        let { name } = this.props[0];
        let url = this.props[0].title;
        const JWToken = localStorage.getItem("JWT");
        if (this.props[0].ratings.overall === 0) {
            this.setState({ hasRatings: " " });
        }

        // If tag exists, update the state to display it
        if(this.props[0].tags !== undefined){
            this.sortAndConvertTags(this.props[0].tags);
        }

        // Updates the count value of the players. Upvote and Downvote(implicit). 
        button.addEventListener("click", async (e) => {

            if (JWToken === null) { // If no JWToken, open Popup
                this.props[4]();
            } else { // If yes JWToken, proceed to attempt to increment

                if (this.state.clicked === false) {

                    let fetched = await fetch(url + "/api/upvote/" + name, {
                        headers: { Authorization: `JWT ${JWToken}` }
                    });
                    fetched = await fetched.json();
                    this.controlVote(fetched.count);
                    if (fetched.increment === true) { // If vote limit is met
                        this.setState({ count: this.state.count + 1, clicked: false });
                    } else { // else alert the user ** NEED TO WORK ON
                        this.props[3]();
                    }

                } else {
                    fetch("ranked/nba/downvote/" + name, {
                        method: "post",
                        body: {
                            "name": name
                        }
                    });
                    this.setState({ count: this.state.count - 1, clicked: false });
                }
            }
        });

    }

    //RENDER the Row
    render() {
        const { isVisible } = this.state;
        const { isVisible1 } = this.state;
        return (

            <div className="row no-gutters">
                
                <div className="voteContainer">
                    {/* DIV cannot exist inside TR so the vote indicator is in TH with pos. abs*/}
                    <Vote className="vote1" pose={isVisible ? "visible" : "hidden"}></Vote>
                    <Vote className="vote2" pose={isVisible1 ? "visible" : "hidden"}></Vote>
                    <Vote className="vote3" pose={isVisible ? "visible" : "hidden"}></Vote>
                </div>
                <div className = "col-sm-1 col-1">{this.props[1]}</div>
                <div className = "col-sm-3 col-4">
                    {/* PROFILE PICTURE*/}
                    <div className="image_border">
                        <img src={this.props[0].image} className="profile_pic" alt="" >
                        </img>
                        <div className="medal"></div>
                    </div></div>
                <div className = {this.state.tagsContainerClass+" col-sm-3 col-7"}>
                    <a className="name" href={`/detailed/${this.props[6]}/${this.props[5]}/${this.props[0].title}/${this.props[0].name}`}>
                        <div>{this.props[0].name}</div>
                        <div>
                            {this.state.tags.slice(0,2).map((tag)=>
                            React.createElement(Tags, [tag[0]])
                            )}
                        </div>
                    </a>
                </div>
                <div className = "col-sm-2 col-4" > {/* RATINGS */}
                    <div className="Stars" style={{ "--rating": this.props[0].ratings.overall / 100 }}></div>
                    {/*<div style = {{display:this.state.hasRatings}}>
                        NO RATINGS
                    </div> ***** THIS DIV SHOWS WHEN THERE IS NO RATING -- WHETHER THIS WILL BE USED WILL BE DETERMINED  */}
                </div>
                <div className = "col-sm-1 col-4">
                    {/* VOTE LOGO/ BUTTON */}
                    <div className="upVote" onClick={this.handleClick}>
                        <img src="/asset/vote_btn.svg" className="voteSVG" alt="vote button"></img>
                    </div>
                </div>
                <div className="count col-sm-2 col-4">{this.state.count}</div>
                <div className="testContainer">
                    {/* *** UNDER DEVELOPMENT VOTE PERCENTAGE BAR */}
                    <div className = "perBarContainer">
                        <div className="bar" style={{ width: (this.props[2] * document.body.clientWidth / 3.5) }}></div>
                        <div className="per">{`  ${(this.props[2]*100).toFixed(1)}%`}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cell;