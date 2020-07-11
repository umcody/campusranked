import React from "react";
import "../styles/homeProto.css";
import Search from "./searchBar/Search.js";

class HomeProto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="protoContainer">
        <div>
          <div id="middle">
            <div>Have The Best Of Your Campus</div>
            <h6 style={{ "font-size": "14px" }}>
              Find Students' Favorite Library, Dininghall, And More
            </h6>
            <Search searchBody={this.props.searchBody} />
          </div>
        </div>
        <img id="char" src="/asset/open-peeps.png"></img>
        {/* <div id="backgroundTriangle"></div> */}
      </div>
    );
  }
}

export default HomeProto;
