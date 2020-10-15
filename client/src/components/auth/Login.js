import React from "react";
import {Link, Route,Redirect} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            data: {},
            showAlert: "none",
            redirectBack: "/"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.placeholder]: event.target.value
        });
    }

    componentDidMount() {
        if (this.props.location) {
            if (this.props.location.state) {
                console.log("YES!");
                const { redirectBack } = this.props.location.state;
                this.setState({ redirectBack: redirectBack });
            }
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = await fetch("/login", { // FETCH TO LOGIN
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        });
        const temp = await data.json();
        if (temp.auth === false) { // IF INVALID INPUT, LOG. *** NEED TO PERFORM AN ACTION TO LET THE USER KNOW OF THE INVALID INPUT**
            this.setState({ showAlert: " " });
        } else {
            localStorage.setItem("JWT", temp.token);
            console.log(window.location);
            console.log(window.location.href);
            if(window.location.pathname === "/loginuser"){
                window.location.href = "/";
            }else{
                window.location.reload();
            }
        }

    }


    render() {
        return (
            <div className = "onePage">
                <form className="authForm" onSubmit={this.handleSubmit}>
                    <img src="/asset/temp_logo.png" />
                    <input id="email" placeholder="email" onChange={this.handleChange} type="email"></input>
                    <input placeholder="password" type = "password" onChange={this.handleChange}></input>
                    <div className="alertText" style={{ display: this.state.showAlert }}>Login Failed. The account either does not exist or your password is incorrect</div>
                    <button type="submit">Let's Rank!</button>
                    <div>
                        <Link className="redirect" to="/registeruser"> Don't have an Account?</Link>
                        <Link className="redirect" to="/forgotpassword" style={{ display: this.state.showAlert }}> Forgot your password?</Link>
                    </div>
                    
                </form>
            </div>
        )
    }
}
export default Login;