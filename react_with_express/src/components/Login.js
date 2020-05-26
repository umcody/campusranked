import React from "react";
import { Route } from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            data:{}
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
        event.preventDefault();
        const data =  await fetch("/login",{ // FETCH TO LOGIN
            method:"post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        });
        const temp = await data.json();
        if(temp.auth === false){ // IF INVALID INPUT, LOG. *** NEED TO PERFORM AN ACTION TO LET THE USER KNOW OF THE INVALID INPUT**
            console.log("COULD NOT LOG IN");
        }else{
            localStorage.setItem("JWT", temp.token);
            window.location.href=("/");
        }
        
    }


    render(){
        return(
            <div>
                <form>
                <input placeholder = "email" onChange = {this.handleChange}></input>
                <input placeholder = "password" onChange = {this.handleChange}></input>
                <button onClick = {this.handleSubmit}>SUBMIT</button>
                </form>
                <a href="/registerUser"> Don't have an Account? Click here</a>
            </div>
        )
    }
}
export default Login;