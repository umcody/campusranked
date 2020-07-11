import React from "react";
import { Link } from "react-router-dom";

class AccountBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
    };
  }

  async componentDidMount() {
    const JWToken = localStorage.getItem("JWT");
    if (JWToken !== null) {
      console.log("NOTNULL");

      const response = await fetch("/findUser", {
        headers: { Authorization: `JWT ${JWToken}` },
      });

      const content = await response.json();
      this.setState({
        username: content.username,
      });
    }
    console.log(document.location.href);
  }

  render() {
    if (this.state.username === "") {
      return (
        <div className="accountBtn">
          <Link
            to={{
              pathname: "/registerUser",
              state: {
                redirectBack: document.location.href,
              },
            }}
          >
            {" "}
            Log In / Sign Up
          </Link>
        </div>
      );
    } else {
      return (
        <div className="accountBtn">
          {`It's time to Rank, `}
          <a href="/profile">
            <div className="username"> {` @${this.state.username}`}</div>
          </a>
        </div>
      );
    }
  }
}
export default AccountBtn;
