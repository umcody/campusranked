import React from "react";
import Cell from "./Cell.js";


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          body: [],
        }
      }

    
      giveOrder(){
          let count = 0;
          console.log("HERE");
          this.state.body.map(player=>{
            console.log("HERE");
              player.setState({rank : count});
              console.log("HERE");
              console.log(player.rank);
          });
          count++;
      }
    
    componentDidMount(){
        fetch("http://localhost:8000/nba")
        
            .then(res=>res.json())
            .then(body => {
                this.setState({body})
            })
            .then(this.giveOrder());
            this.index = 1;
    }


    render() {
        return (
            <div>
                <table className="ranked_table">
                    <tbody>
                    {this.state.body.map(player => React.createElement(Cell, [player,this.index++]))}
                    </tbody>
                </table>
                <button id="vote_btn"><a>RANK</a></button>
                <a className ="notice">The rank will be sorted once you refresh/exit the page</a>
            </div>
        );
    }
}
export default App;