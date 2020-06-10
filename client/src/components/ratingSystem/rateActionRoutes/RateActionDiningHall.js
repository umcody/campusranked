import React from "react";
import RateStars from "../RateStars";
import RateStarsTest from "../RateStarsTest";
import Popup from "reactjs-popup";
import Login from "../../auth/Login.js";

import "./rateAction.css";

class RateActionDiningHall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {
            },
            overall: 0,
            taste: 0,
            hygiene: 0,
            variety:0,
            nutrition:0,
            price:0,
            title:"",
            review: "",
            name: "",
            loginPopup: false,
            showAlert:"none",
        }
        this.changeOverall = this.changeOverall.bind(this);
        this.changeTaste = this.changeTaste.bind(this);
        this.changeHygiene = this.changeHygiene.bind(this);
        this.changeVariety = this.changeVariety.bind(this);
        this.changeNutrition = this.changeNutrition.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleName = this.handleName.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    openPopup() {
        this.setState({ loginPopup: true });
    }
    closePopup() {
        this.setState({ loginPopup: false });
    }

    // Functions to change the state of each criterions according to the user
    changeOverall(number) {
        this.setState({ overall: number });
    }
    changeTaste(number) {
        this.setState({ taste: number });
    }
    changeHygiene(number) {
        this.setState({ hygiene: number });
        console.log(this.state);
    }
    changeVariety(number) {
        this.setState({ variety: number });
        console.log(this.state);
    }
    changeNutrition(number) {
        this.setState({ nutrition: number });
        console.log(this.state);
    }
    changePrice(number) {
        this.setState({ price: number });
        console.log(this.state);
    }
    //

    async handleSubmit(event) {
        // CONDITIONS BEFORE SUBMITN THE REVIEW
        const JWToken = localStorage.getItem("JWT");
        if (JWToken !== null) {

            const response = await fetch("/findUser", {
                headers: { Authorization: `JWT ${JWToken}` }
            });
            const content = await response.json();
            if (content == false) {
                this.openPopup();
            }else{

                if (this.state.overall === 0) {
                    this.setState({showAlert:" "})
                } else if (this.state.space === 0) {
                    this.setState({showAlert:" "})
                } else if (this.state.friendliness === 0) {
                    this.setState({showAlert:" "})
                } else {
                    fetch("/api/rate/dininghall/" + this.state.body.title + "/" + this.state.body.name, {
                        method: "post",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(this.state)
                    })
                }

            }
        } else {
            this.openPopup();
        }

    }

    handleTextArea(event) {
        this.setState({ review: event.target.value })
        console.log(this.state.review);
    }

    handleName(event) {
        this.setState({ name: event.target.value })
        console.log(this.state.name);
    }

    async componentDidMount() {
        /// CHECK IF USER IS LOGGED IN
        const JWToken = localStorage.getItem("JWT");
        if (JWToken !== null) {

            const response = await fetch("/findUser", {
                headers: { Authorization: `JWT ${JWToken}` }
            });
            const content = await response.json();
            if (content == false) {
                this.openPopup();
            }
        } else {
            this.openPopup();
        }

        // FETCH NECESSARY DATA FOR THE RATING CRITEREONS
        const { match: { params } } = this.props;
        const title = params.title;
        const item = params.item;

        this.setState({title:item});

        const data = await fetch("/api/detailed/" + title + "/" + item);
        const json = await data.json();
        this.setState({
            body: json
        })
        console.log("HEY!");
        console.log(this.state.body);
        console.log(this.state);
    }

    render() {
        return (
            <div className="rateFormContainer">
                <Popup
                    open={this.state.loginPopup}
                    closeOnDocumentClick
                    onClose={this.closePopup}>
                    <Login />
                </Popup>
                <div id="title">Rate For {this.state.title}</div>
                <form>
                    <div id="rateForm">
                        <table>
                            <tr>
                                <th>Overall</th>

                                <th><RateStars name="overall" whenClicked={this.changeOverall} /></th>
                            </tr>
                            <tr>
                                <th>Taste</th>
                                <th><RateStars name="taste" whenClicked={this.changeTaste} /></th>
                            </tr>
                            <tr>
                                <th>Hygiene</th>
                                <th><RateStars name="hygiene" whenClicked={this.changeHygiene} /></th>
                            </tr>
                            <tr>
                                <th>variety</th>
                                <th><RateStars name="variety" whenClicked={this.changeVariety} /></th>
                            </tr>
                            <tr>
                                <th>Nutrition</th>
                                <th><RateStars name="nutrition" whenClicked={this.changeNutrition} /></th>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <th><RateStars name="price" whenClicked={this.changePrice} /></th>
                            </tr>
                        </table>
                    </div>

                    <div id="writingAreaContainer">
                        <input placeholder="Name (OPTIONAL)" onChange={this.handleName}></input>
                        <textarea type="text" id="writingArea" onChange={this.handleTextArea} placeholder="Write Your Review Here (OPTIONAL)"></textarea>
                    </div>

                    <btn className="submitBtn" onClick={this.handleSubmit}> Submit </btn>
                    <div style = {{display:this.state.showAlert}}>You must rate on all criterions!</div>
                </form>
            </div>
        )
    }
}

export default RateActionDiningHall;