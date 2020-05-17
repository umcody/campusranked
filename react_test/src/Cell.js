import React from "react";
import ReactDOM from "react-dom";
//import image from "../public/asset/kobeBryant.jpg";

class Cell extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const current = ReactDOM.findDOMNode(this);
        let button = current.querySelector(".upVote");
        button.addEventListener("click", (e)=>{
            console.log("clicked" + this.props.name);
        })
    }


    render() {
        return (
            <tr className="row">
                <th>{this.props.rank}</th>
                <th>
                    <div className="image_border">
                        <img src={this.props.image} className="profile_pic" alt="" >
                        </img>
                        <div className="medal"></div>
                    </div></th>
                <th><div className="name">{this.props.name}</div></th>
                <th>
                    <a className="upVote">
                        <img src="/asset/vote_btn.svg"></img>
                    </a>
                </th>
                <th className="count">{this.props.count}</th>
            </tr>
        );
    }
}

export default Cell;