import React from "react";
import { Route } from "react-router-dom";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            showAlert: "none",
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
        let success = await fetch("/api/forgotpassword/"+this.state.email);
        success = await success.json();
        if(success === true){
            //redirect to success component
        }else{
            this.setState({showAlert:""});
        }
    }


    render() {
        return (
            <div>
                <form className="authForm" onSubmit={this.handleSubmit}>
                    <input id="email" placeholder="email" onChange={this.handleChange} type="email"></input>
                    <div class="alertText" style={{ display: this.state.showAlert }}>The account does not exist</div>
                    <button type="submit">Reset</button>
                </form>
            </div>
        )
    }
}
export default ForgotPassword;