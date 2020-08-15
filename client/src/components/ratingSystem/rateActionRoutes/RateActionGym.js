import React from "react";
import RateStars from "../RateStars";
import RateStarsTest from "../RateStarsTest";
import {Redirect} from "react-router-dom";
import Popup from "reactjs-popup";
import Login from "../../auth/Login.js";
import { WithContext as ReactTags } from 'react-tag-input';


import "./rateAction.css";

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class RateAction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {},
            redirect:null,
            overall: 0,
            space: 0,
            equipment: 0,
            cleanliness:0,
            community:0,
            review: "",
            name: "",
            loginPopup: false,
            showAlert: "none",
            tags: [],
            suggestions: []
        }
        this.changeOverall = this.changeOverall.bind(this);
        this.changeSpace = this.changeSpace.bind(this);
        this.changeEquipment = this.changeEquipment.bind(this);
        this.changeCleanliness = this.changeCleanliness.bind(this);
        this.changeCommunity = this.changeCommunity.bind(this);
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
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    changeOverall(number) {
        this.setState({ overall: number });
    }
    changeSpace(number) {
        this.setState({ space: number });
    }
    changeEquipment(number) {
        this.setState({ equipment: number });
    }
    changeCleanliness(number) {
        this.setState({ cleanliness: number });
    }
    changeCommunity(number) {
        this.setState({ community: number });
    }

    async handleSubmit(event) {
        const JWToken = localStorage.getItem("JWT");
        if (JWToken !== null) {

            const response = await fetch("/findUser", {
                headers: { Authorization: `JWT ${JWToken}` }
            });
            const content = await response.json();
            if (content == false) {
                this.openPopup();
            } else {

                if (this.state.overall === 0) {
                    this.setState({ showAlert: " " })
                } else if (this.state.space === 0) {
                    this.setState({ showAlert: " " })
                } else if (this.state.equipment === 0) {
                    this.setState({ showAlert: " " })
                } else if (this.state.cleanliness=== 0) {
                    this.setState({ showAlert: " " })
                } else if (this.state.community === 0) {
                    this.setState({ showAlert: " " })
                } else {
                    fetch(`/api/rate/${this.props.match.params.school}/gym/${this.props.match.params.title}/${this.props.match.params.item}`, {
                        method: "post",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(this.state)
                    })
                }

            }
            this.setState({redirect:`/ranked/${this.props.match.params.school}/${this.props.match.params.title}`});
        } else {
            this.openPopup();
        }
        window.location = `/detailed/${this.props.match.params.school}/gym/${this.props.match.params.title}/${this.props.match.params.item}`


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

        const data = await fetch("/api/detailed/" + title + "/" + item);
        const json = await data.json();
        this.setState({
            body: json
        })
        console.log(this.state.body);
    */}
    }

    render() {
        const { tags, suggestions } = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="rateFormContainer container">
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
                                <th>Space</th>
                                <th><RateStars name="space" whenClicked={this.changeSpace} /></th>
                            </tr>
                            <tr>
                                <th>Equipment</th>
                                <th><RateStars name="equipment" whenClicked={this.changeEquipment} /></th>
                            </tr>
                            <tr>
                                <th>Cleanliness</th>
                                <th><RateStars name="cleanliness" whenClicked={this.changeCleanliness} /></th>
                            </tr>
                            <tr>
                                <th>Community</th>
                                <th><RateStars name="community" whenClicked={this.changeCommunity} /></th>
                            </tr>
                        </table>
                    </div>

                    <div id="writingAreaContainer">
                        <input placeholder="Name (OPTIONAL)" onChange={this.handleName}></input>
                        <textarea type="text" id="writingArea" onChange={this.handleTextArea}>Write Your Review Here (OPTIONAL)</textarea>
                    </div>

                    <ReactTags tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        delimiters={delimiters} />

                    <btn className="submitBtn" onClick={this.handleSubmit}> Submit </btn>
                    <p style={{ display: this.state.showAlert }}>You must rate on all criterions!</p>
                </form>
            </div>
        )
    }
}

export default RateAction;