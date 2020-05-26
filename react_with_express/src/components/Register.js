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
        }else{
            window.location("/loginUser")
        }
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