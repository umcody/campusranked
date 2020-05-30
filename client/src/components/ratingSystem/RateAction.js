import React from "react";
import RateStars from "./RateStars";
import "./rateAction.css";

class RateAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {}
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const title = params.title;
        const item = params.item;

        const data = await fetch("/api/detailed/" + title + "/" + item);
        const json = await data.json();
        this.setState({
            body: json
        })
        console.log(this.state.body);
    }

    render() {
        return (
            <div className="rateFormContainer">
                <div id="title">Rate For {this.state.body.name}</div>
                <form>
                    <div id="rateForm">
                        <table>
                            <tr>
                                <th>Overall</th>
                                <th><RateStars /></th>
                            </tr>
                            <tr>
                                <th>Equipments</th>
                                <th><RateStars /></th>
                            </tr>
                            <tr>
                                <th>Space</th>
                                <th><RateStars /></th>
                            </tr>
                            <tr>
                                <th>Friendliness</th>
                                <th><RateStars /></th>
                            </tr>
                        </table>
                    </div>
                    <div id="writingAreaContainer">
                        <textarea type="text" id="writingArea">Write Your Review Here (OPTIONAL)</textarea>
                    </div>
                </form>
            </div>
        )
    }
}

export default RateAction;