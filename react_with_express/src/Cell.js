import React from "react";
import ReactDOM from "react-dom";
import posed from "react-pose";
//import image from "../public/asset/kobeBryant.jpg";

const Vote = posed.div({
    hidden: { left: "0px" },
    visible: {
        left: "-75px",
        transition: {
            width: { ease: "easeInAndOut", duration: 300 }
        }
    }
});

class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            count: this.props[0].count,
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    componentDidMount() {
        const current = ReactDOM.findDOMNode(this);
        let button = current.querySelector(".upVote");
        let player = this.props[0].name;
        console.log(player);
        button.addEventListener("click", (e) => {
            if (this.state.clicked === false) {
                fetch("/nba/" + player, {
                    method: "post",
                    body: {
                        "name": player
                    }
                });
                this.setState({ count: this.state.count + 1, clicked: true });
            }else{
                this.setState({ count: this.state.count -1, clicked: false});
            }
        })
    }


    render() {
        const { isVisible } = this.state;
        return (

            <tr className="row">
                <th className="voteContainer">

                    <Vote className="vote" pose={isVisible ? "visible" : "hidden"}></Vote>
                </th>
                <th>{this.props[1]}</th>
                <th>
                    <div className="image_border">
                        <img src={this.props[0].image} className="profile_pic" alt="" >
                        </img>
                        <div className="medal"></div>
                    </div></th>
                <th><div className="name">{this.props[0].name}</div></th>
                <th>
                    <a className="upVote">
                        <img src="/asset/vote_btn.svg" onClick={this.handleClick}></img>
                    </a>
                </th>
                <th className="count">{this.state.count}</th>
            </tr>
        );
    }
}

export default Cell;