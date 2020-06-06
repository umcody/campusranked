import React from "react";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email: "",
            password: "",
            hasError: "none"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.placeholder]: event.target.value
        });
    }

     async handleSubmit(event){
        console.log("WHAT");
        event.preventDefault();
        const data =  await fetch("/register",{ // FETCH to Register
            method:"post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        });
        const temp = await data.json();
        if(temp.auth === false){ //USER EXISTS, LOG. *** NEED TO PERFORM AN ACTION TO LET THE USER KNOW OF THE INVALID INPUT**
            console.log(temp.message);
            this.setState({
                hasError:"grid"
            })
        }else{
            window.location="/loginUser";
        }
    }


    render(){
        return(
            <div id = "authFormContainer">
                <form className = "authForm" onSubmit = {this.handleSubmit}>
                    <img src = "/asset/temp_logo.png"/>
                    <input id = "username" placeholder = "username" onChange = {this.handleChange} type="text" 
                    pattern = "^[a-z0-9]{3,12}$"  title="The username must only be of lower-case letters or numbers"></input>
                    <input id = "email" placeholder = "email" onChange = {this.handleChange} type="email"></input>
                    <input id = "password" placeholder = "password" onChange = {this.handleChange }
                    pattern = "^[a-zA-Z0-9$!=+&^%*~]{5,15}$" title = "The password can be of any letters and digits and special characters($!=+&^%*~)"></input>

                    <button type = "submit">REGISTER!</button>

                    <a href ="/loginUser"> Already have an account?</a>


                    <p className="regError" style = {{display: this.state.hasError}}>The email already exists in our System</p>
                </form>
            </div>
        )
    }
}
export default Register;