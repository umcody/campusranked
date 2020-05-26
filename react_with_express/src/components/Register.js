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
            window.location("/loginUser")
        }
    }


    render(){
        return(
            <div>
                <form className = "authForm">
                    <img src = "../asset/temp_logo.png"/>
                    <input placeholder = "username" onChange = {this.handleChange}></input>
                    <input placeholder = "email" onChange = {this.handleChange}></input>
                    <input placeholder = "password" onChange = {this.handleChange}></input>

                    <button onClick = {this.handleSubmit}>SUBMIT</button>

                    <a href ="/loginUser"> Already have an account?</a>


                    <p className="regError" style = {{display: this.state.hasError}}>The email already exists in our System</p>
                </form>
            </div>
        )
    }
}
export default Register;