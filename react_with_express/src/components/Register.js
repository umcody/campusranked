import React from "react";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            email: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.placeholder]: event.target.value
        });
    }

     handleSubmit(event){

        fetch("/register",{
            method:"post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
        console.log(this.state);
    }


    render(){
        return(
            <div>
                <form>
                    <input placeholder = "username" onChange = {this.handleChange}></input>
                    <input placeholder = "email" onChange = {this.handleChange}></input>
                    <input placeholder = "password" onChange = {this.handleChange}></input>
                    <button onClick = {this.handleSubmit}>SUBMIT</button>
                </form>
                <a href ="/loginUser"> Already have an account? Click Here </a>
            </div>
        )
    }
}
export default Register;