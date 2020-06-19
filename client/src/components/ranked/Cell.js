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
            console.log(tags);
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

            console.log(url + "/api/upvote/" + name);


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

            <tr className="row">
                
                <th className="voteContainer">
                    {/* DIV cannot exist inside TR so the vote indicator is in TH with pos. abs*/}
                    <Vote className="vote1" pose={isVisible ? "visible" : "hidden"}></Vote>
                    <Vote className="vote2" pose={isVisible1 ? "visible" : "hidden"}></Vote>
                    <Vote className="vote3" pose={isVisible ? "visible" : "hidden"}></Vote>
                </th>
                <th>{this.props[1]}</th>
                <th>
                    {/* PROFILE PICTURE*/}
                    <div className="image_border">
                        <img src={this.props[0].image} className="profile_pic" alt="" >
                        </img>
                        <div className="medal"></div>
                    </div></th>
                <th className = {this.state.tagsContainerClass}>
                    <a className="name" href={`/detailed/${this.props[5]}/${this.props[0].title}/${this.props[0].name}`}>
                        <div>{this.props[0].name}</div>
                        <div>
                            {this.state.tags.slice(0,2).map((tag)=>
                            React.createElement(Tags, [tag[0]])
                            )}
                        </div>
                    </a>
                </th>
                <th> {/* RATINGS */}
                    <div className="Stars" style={{ "--rating": this.props[0].ratings.overall / 100 }}></div>
                    {/*<div style = {{display:this.state.hasRatings}}>
                        NO RATINGS
                    </div> ***** THIS DIV SHOWS WHEN THERE IS NO RATING -- WHETHER THIS WILL BE USED WILL BE DETERMINED  */}
                </th>
                <th>
                    {/* VOTE LOGO/ BUTTON */}
                    <div className="upVote" onClick={this.handleClick}>
                        <img src="/asset/vote_btn.svg" className="voteSVG" alt="vote button"></img>
                    </div>
                </th>
                <th className="count">{this.state.count}</th>
                <th className="testContainer">
                    {/* *** UNDER DEVELOPMENT VOTE PERCENTAGE BAR */}
                    <div className = "perBarContainer">
                        <div className="bar" style={{ width: (this.props[2] * document.body.clientWidth / 3.5) }}></div>
                        <div className="per">{`  ${(this.props[2]*100).toFixed(1)}%`}</div>
                    </div>
                </th>
            </tr>
        );
    }
}

export default Cell;