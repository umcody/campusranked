/*jshint esversion: 6 */
import React from "react";
import Cell from "./Cell.js";
import Popup from "reactjs-popup";
import Login from "../auth/Login";
import OverallRatings from "./overallRatings.js";

let index = 1;
// THIS INDEX SYSTEM NEEDS TO BE FIXED. Sometimes, the rank is repeated -- refresh the page multiple times.
class Ranked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [],
      link: props.location.pathname,
      title: "DEFAULT",
      totalCount: 0,
      showVoteLimitAlert: "none",
      loginPopup: false,
      category: "",
      index: 1,
      averageRating: 0,
      collapseHeight: "fit-content",
    };
    this.toggleVoteLimitAlert = this.toggleVoteLimitAlert.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleExpandMore = this.handleExpandMore.bind(this);
  }

  openPopup() {
    this.setState({ loginPopup: true });
  }
  closePopup() {
    this.setState({ loginPopup: false });
  }

  toggleVoteLimitAlert() {
    this.setState({ showVoteLimitAlert: " " });
  }

  handleExpandMore(event) {
    this.setState({ collapseHeight: "fit-content" });
  }

  componentDidUpdate() {
    index = 1;
  }
  // When mounted, fetch all necessary data such as Items, Title, total Count respectively
  componentDidMount() {
    fetch(
      "/api/" +
        this.props.match.params.school +
        "/" +
        this.props.match.params.item
    )
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          totalCount: body.totalCount,
          category: body.category,
          title: body.name,
        });
        console.log(this.state.category);
      });

    fetch("/api" + this.state.link)
      .then((res) => res.json())
      .then((body) => {
        this.setState({ body });
        index = 1;

        // Finding the average overall rating of the items.
        let averageRating = 0;
        let validItemCount = 0;

        this.state.body.map(item => {
          if (item.ratings.overall !== 0 && !isNaN(item.ratings.overall)) {
            console.log(item.ratings.overall);
            console.log(item);
            averageRating += (item.ratings.overall * item.reviewCounts);
            validItemCount += item.reviewCounts;
            console.log("average : "+averageRating);
            console.log("valid : "+validItemCount);
          }
        })

        averageRating = (averageRating / validItemCount / 100).toFixed(2);
        this.setState({ averageRating: averageRating });
      });

    index = 1;
  }

  render() {
    const schoolLowered = this.props.match.params.school.toLowerCase();
    return (
      <div className="ranked">

        <img id="imgBanner" src={`https://campusranked.s3.us-east-2.amazonaws.com/${schoolLowered}/${schoolLowered}_banner.jpg`} />

        <Popup
          open={this.state.loginPopup}
          closeOnDocumentClick
          onClose={this.closePopup}
        >
          <Login />
        </Popup>

        <div className="title">
          <p>{this.state.title}</p>
        </div>

        <p
          id="voteLimitAlert"
          style={{ display: this.state.showVoteLimitAlert }}
        >
          Vote Limit has Been Reached!
        </p>

        {
          (isNaN(this.state.averageRating)) ? <OverallRatings ratings={"There is no rating yet"} /> : <OverallRatings ratings={this.state.averageRating} />
        }
        {/* <div className="collapsable">  *****    EXPANDABLE BOX (DISABLED)*/ }
          <table className="ranked_table" style = {{"max-height":this.state.collapseHeight}}>
            <tbody>
              {/* Creates row cell for every item in the body */}
              {this.state.body.map((item) =>
                React.createElement(Cell, [
                  item,
                  index++,
                  item.count / this.state.totalCount,
                  this.toggleVoteLimitAlert,
                  this.openPopup,
                  this.state.category,
                  this.props.match.params.school,
                ])
              )}
            </tbody>
          </table>
        {/*  <div className = "expandBtn" onClick = {this.handleExpandMore}>
            <img className="expandImg" src="/asset/expandMore.svg"></img>
            <div className="smallText">Show More</div>
          </div>
         </div> */}
        <img id="graphics_ranked" src={`/asset/undraw_${this.state.category}.svg`} />
        <div className="notice">
          The rank will be sorted once you refresh/exit the page
        </div>

        <div className="spacer"></div>
      </div>
    );
  }
}
export default Ranked;
