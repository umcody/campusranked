import React from "react";
import { Link } from "react-router-dom"

class AccountBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: ""
        }
    }



    async componentDidMount() {
        const JWToken = localStorage.getItem("JWT");
        if (JWToken !== null) {
            console.log("NOTNULL");

            const response = await fetch("/findUser", {
                headers: { Authorization: `JWT ${JWToken}` }
            });

            const content = await response.json();

            if(content.username == null){ // If User is undefined, clear local storage and navigate to Hompage
                localStorage.clear();
            }else{
                this.setState({
                    username: content.username
                });
            }
        }
        console.log(document.location.href);

    }



    render() {

        if (this.state.username === "") {
            return (
                <div className="accountBtn col-sm-3">
                    <Link to={{
                        pathname: "/registeruser",
                        state: {
                            redirectBack: document.location.href
                        }
                    }
                    } className = "center"> Log In / Sign Up</Link>

                </div>
            );
        } else {
            return (

                <div className="accountBtn col-sm-3">
                    <div className = "center">
                        <div style={{ display: "inline-block" }}>{`It's time to Rank, `}</div>
                        <a href="/profile"><div className="username"> {` @${this.state.username}`}</div></a>
                    </div>
                </div>
            );
        }
    }


}
export default AccountBtn;