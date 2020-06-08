import React from "react";

class RegisterComplete extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:props.match.params.username
        }
        console.log();
    }
    componentDidMount(){
        console.log(this.state.username);
    }

    render(){
        return(
            <div id = "congratulationContainer">
                <div>
                Registration Complete! 
                Lets Start Ranking, {this.state.username.toUpperCase()}!
                </div>
                
                <a href = "/loginUser">LOGIN</a>
            </div>
        )
    }
}

export default RegisterComplete;