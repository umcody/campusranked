import React from "react";
import RateStars from "../RateStars";
import RateStarsTest from "../RateStarsTest";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import Login from "../../auth/Login.js";
import { WithContext as ReactTags } from 'react-tag-input';


import "./rateAction.css";

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class RateActionDiningHall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {
            },
            redirect: null,
            overall: 0,
            taste: 0,
            hygiene: 0,
            variety: 0,
            nutrition: 0,
            price: 0,
            title: "",
            review: "",
            name: "",
            loginPopup: false,
            showAlert: "none",
            tags: [],
            suggestions: []
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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    openPopup() {
        this.setState({ loginPopup: true });
    }
    closePopup() {
        this.setState({ loginPopup: false });
    }

    //Functions for tagSystem
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        tag.id = tag.id.replace(/\s/g, '').toLowerCase();
        tag.text = tag.id;
        this.setState(state => ({ tags: [...state.tags, tag] }));
        console.log(this.state.tags);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
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
        event.preventDefault();
        // CONDITIONS BEFORE SUBMITN THE REVIEW
        const JWToken = localStorage.getItem("JWT");
        if (JWToken !== null) {

            const response = await fetch("/findUser", {
                headers: { Authorization: `JWT ${JWToken}` }
            });
            const content = await response.json();
            if (content == false) {
                this.openPopup();
            } else {
                console.log(this.state.overall);
                if (this.state.overall === 0) {
                    this.setState({ showAlert: " " })
                    return;
                } else if (this.state.variety === 0) {
                    this.setState({ showAlert: " " })
                    return;
                } else if (this.state.taste === 0) {
                    this.setState({ showAlert: " " })
                    return;
                } else if (this.state.hygiene === 0) {
                    this.setState({ showAlert: " " })
                    return;
                } else if (this.state.price === 0) {
                    this.setState({ showAlert: " " })
                    return;
                } else if (this.state.nutrition === 0) {
                    this.setState({ showAlert: " " })
                    return;
                } else {
                    fetch(`/api/rate/${this.props.match.params.school}/dininghall/${this.props.match.params.title}/${this.props.match.params.item}`, {
                        method: "post",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(this.state)
                    })
                }

            }
            this.setState({ redirect: `/ranked/${this.props.match.params.school}/${this.props.match.params.title}` });
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

        this.setState({ title: this.props.match.params.item });
        {/*
        // FETCH NECESSARY DATA FOR THE RATING CRITEREONS
        const { match: { params } } = this.props;
        const title = params.title;
        const item = params.item;

        

        const data = await fetch("/api/detailed/"+title+"/"+item);
        const json = await data.json();
        this.setState({
            body: json
        })
    */}
    }

    render() {
        const { tags, suggestions } = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

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
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>

                    <div id="writingAreaContainer">
                        <input placeholder="Name (OPTIONAL)" onChange={this.handleName}></input>
                        <textarea type="text" id="writingArea" onChange={this.handleTextArea} placeholder="Write Your Review Here (OPTIONAL)"></textarea>
                    </div>

                    <ReactTags tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        delimiters={delimiters} />

                    <button className="submitBtn" onClick={this.handleSubmit}> Submit </button>
                    <div style={{ display: this.state.showAlert }}>You must rate on all criterions!</div>
                </form>
            </div>
        )
    }
}

export default RateActionDiningHall;