import React from "react";

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
        const data =  await fetch("/login",{
            method:"post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        });
        const temp = await data.json();
        localStorage.setItem("JWT", temp.token);
    }


    render(){
        return(
            <form>
                <input placeholder = "email" onChange = {this.handleChange}></input>
                <input placeholder = "password" onChange = {this.handleChange}></input>
                <button onClick = {this.handleSubmit}>SUBMIT</button>
            </form>
        )
    }
}
export default Login;