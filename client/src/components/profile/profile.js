import React from "react";
import ProfileVoted from "./profileVoted";

class profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    async componentDidMount() {
        const JWToken = localStorage.getItem("JWT");
        if (JWToken) {
            let user = await fetch("/findUser", { headers: { Authorization: `JWT ${JWToken}` } })
            user = await user.json();
            this.setState({ user });
            console.log(this.state.user.voted);
        }

    }

    handleLogOut(event) {
        localStorage.removeItem("JWT");
        window.location = "/";
    }

    render() {
        if (this.state.user.voted) {
            return (
                <div className="onePage">
                    <div className = "center" style = {{top:"40%"}}>
                        <div id="profileIntro">
                            <div>We don't keep much data.</div>
                            <div>This is all we got.</div>
                        </div>
                        <div>
                            <div id="profileInfo">
                                <div>
                                    <div className="inline">
                                        Username:
                            </div>
                                    <div className="inline">
                                        {` ${this.state.user.username}`}
                                    </div>
                                </div>
                                <div>
                                    <div className="inline">
                                        Email:
                            </div>
                                    <div className="inline">
                                        {` ${this.state.user.email}`}
                                    </div>
                                </div>
                            </div>
                            <div id="profileVotedContainer">
                                {this.state.user.voted.map((item) =>
                                    React.createElement(ProfileVoted, item)
                                )}
                            </div>
                            <a onClick={this.handleLogOut}> LOG OUT </a>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (<div></div>);
        }
    }
}
export default profile;