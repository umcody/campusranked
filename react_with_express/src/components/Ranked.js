import React from "react";
import Cell from "./Cell.js";


// THIS INDEX SYSTEM NEEDS TO BE FIXED. Sometimes, the rank is repeated -- refresh the page multiple times.
let index =1;
class Ranked extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: [],
            link: (props.location.pathname),
            title: "DEFAULT",
            totalCount: 0
        }
    }

    // When mounted, fetch all necessary data such as Items, Title, total Count respectively
    componentDidMount() {

        fetch("/search/" + this.props.match.params.item)
            .then(res => res.json())
            .then(body => {
                this.setState({totalCount: body[0].totalCount});
            });

        fetch(this.state.link)

            .then(res => res.json())
            .then(body => {
                this.setState({ body })
                index =1;
            });



        fetch("/getTitle/" + this.props.match.params.item)
            .then(res => res.json())
            .then(body => {
                this.setState({ title: body[0].name});
                index =1;
            });


        
        index =1;
        console.log(this.props);
    }



    render() {
        return (
            <div className = "Ranked">
                <div className="title"><a>{this.state.title}</a></div>
                <table className="ranked_table">
                    <tbody>
                        {/* Creates row cell for every item in the body */}
                        {this.state.body.map(item => React.createElement(Cell, [item, index++,(item.count/this.state.totalCount)]))}
                    </tbody>
                </table>
                <a className="notice">The rank will be sorted once you refresh/exit the page</a>
            </div>
        );
    }
    index=1;
}
export default Ranked;