import React from "react";
import Cell from "./Cell.js";
import Popup from "reactjs-popup";
import Login from "./Login";
import OverallRatings from "./overallRatings.js";


let index =1;
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
      category:"",
      index:1,
      averageRating:0,
    };
    this.toggleVoteLimitAlert = this.toggleVoteLimitAlert.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
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


  componentDidUpdate(){
    index = 1;
  }
  // When mounted, fetch all necessary data such as Items, Title, total Count respectively
  componentDidMount() {
    fetch("/search/" + this.props.match.params.item)

      .then(res => res.json())
      .then(body => {
        
        this.setState({
          totalCount: body[0].totalCount,
          category: body[0].category
        });
      });

    fetch("/api" + this.state.link)
      .then((res) => res.json())
      .then((body) => {
        this.setState({ body });
        index = 1;

        // Finding the average overall rating of the items. 
        let averageRating = 0;
        let validItemCount = 0;
        this.state.body.map(item=>{
          console.log(item);
          if(item.ratings.overall !== 0){
            averageRating+=(item.ratings.overall*item.reviewCounts);
            validItemCount+= item.reviewCounts;
          }
        })
        averageRating = (averageRating/validItemCount/100).toFixed(2);
        this.setState({averageRating:averageRating});
      });

    fetch("/getTitle/" + this.props.match.params.item)
      .then((res) => res.json())
      .then((body) => {
        this.setState({ title: body[0].name });
        document.title= body[0].name;
        index = 1;
      });
    index = 1;

  }

  render() {
    return (
      <div className="ranked">
        <img id = "imgBanner" src = "/asset/uwmadison_banner.jpg"/>
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
        <OverallRatings ratings = {this.state.averageRating}/>
        <table className="ranked_table">
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
              ])
            )}
          </tbody>
        </table>
        <img id = "graphics_ranked"src = {`../asset/undraw_${this.state.category}.svg`}/>
        <div className="notice">
          The rank will be sorted once you refresh/exit the page
        </div>
        <div className="spacer"></div>
      </div>
    );
  }
}
export default Ranked;
