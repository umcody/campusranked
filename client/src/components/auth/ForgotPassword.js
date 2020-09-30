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
        event.preventDefault();
        console.log(this.state.email);
        let success = await fetch(`/api/forgotpassword`, {
            method: "post",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({email:this.state.email})
        })
        success = await success.json();
        if(success === true){
            console.log("RESET!");
            //redirect to success component
        }else{
            console.log("RESET!");
            this.setState({showAlert:""});
        }
    }

    render() {
        return (
            <div className = "onePage">
                <form className="authForm" onSubmit={this.handleSubmit}>
                    <h1 style ={{"margin":"0px 0px 10px 0px"}}>Forgot Password?</h1>
                    <h4 style ={{"margin":"0px 0px 20px 0px"}}>So disappointing...</h4>
                    <input id="email" placeholder="email" onChange={this.handleChange} type="email"></input>
                    <div className="alertText" style={{ display: this.state.showAlert }}>The account does not exist</div>
                    <button type="submit">Reset</button>
                </form>
            </div>
        )
    }
}
export default ForgotPassword;