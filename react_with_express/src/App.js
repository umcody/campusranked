import React from "react";
import Ranked from "./components/Ranked.js"
import { Route ,withRouter} from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Dummy from "./components/dummy";



class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            body:[]
        }
    }

    componentDidMount(){
        fetch("/search")
        .then(res=> res.json())
        .then(body=>{
            this.setState({body});
            console.log(this.state);
        });
        
    }

    render(){
        return(
            <div>
            <SearchBar searchBody={this.state.body}/>
            <Route exact path = "/ranked" component ={Dummy}/>
            <Route exact path = "/ranked/:item"
            render={
                props=> <Ranked {...props}/>
            }
            />
            </div>
        );
    }
}

export default App;