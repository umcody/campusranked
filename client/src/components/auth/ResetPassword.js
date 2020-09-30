import React from "react";
import { Route } from "react-router-dom";

class resetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordVer: "",
            showAlertError: "none",
            showAlertPassword: "none"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
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
        console.log(this.state);
        if (this.state.password === this.state.passwordVer) {
            let success = await fetch(`/api/reset/${this.props.match.params.token}`, {
                method: "post",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.state)
            })
            success = await success.json();
            if (success === true) {
                // redirect to reset successful page or component
            } else {
                this.setState({
                    showAlertError: ""
                });
            }

        } else {
            this.setState({
                showAlertPassword: ""
            });
        }
    }


    render() {
        return (
            <div className = "onePage">
                <form className="authForm" onSubmit={this.handleSubmit}>
                <h1 style ={{"margin":"0px 0px 50px 0px"}}>Let's reset this thing!</h1>
                    <input id="password" placeholder="New Password" onChange={this.handleChange}
                        pattern="^[a-zA-Z0-9$!=+&^%*~]{5,15}$" title="The password can be of any letters and digits and special characters($!=+&^%*~)"></input>
                    <input id="passwordVer" placeholder="New Password Verification" onChange={this.handleChange}
                        pattern="^[a-zA-Z0-9$!=+&^%*~]{5,15}$" title="The password can be of any letters and digits and special characters($!=+&^%*~)"></input>

                    <div class="alertText" style={{ display: this.state.showAlertPassword }}>The passwords must match!</div>
                    <div class="alertText" style={{ display: this.state.showAlertError }}>Error: the link is either invalid or has expired</div>
                    <button type="submit">Reset</button>
                </form>
            </div>
        )
    }
}
export default resetPassword;