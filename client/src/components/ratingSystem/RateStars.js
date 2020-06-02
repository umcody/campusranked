import React from "react";
import "./rateStar.css"

class RateStars extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log(this.props);
        this.props.whenClicked(event.target.value);
    }

    render() {
        return (
            <fieldset className={`rating ${this.props.name}`}>
                <input type="radio" id={`star5-${this.props.name}`} name={this.props.name} value={5} onClick = {this.handleClick}/><label className="full" for={`star5-${this.props.name}`} title="Awesome - 5 stars"></label>
                <input type="radio" id={`star4half-${this.props.name}`} name={this.props.name} value={4.5} onClick = {this.handleClick}/><label className="half" for={`star4half-${this.props.name}`} title="Pretty good - 4.5 stars"></label>
                <input type="radio" id={`star4-${this.props.name}`} name={this.props.name} value={4} onClick = {this.handleClick}/><label className="full" for={`star4-${this.props.name}`} title="Pretty good - 4 stars"></label>
                <input type="radio" id={`star3half-${this.props.name}`} name={this.props.name} value={3.5} onClick = {this.handleClick}/><label className="half" for={`star3half-${this.props.name}`} title="Meh - 3.5 stars"></label>
                <input type="radio" id={`star3-${this.props.name}`} name={this.props.name} value={3} onClick = {this.handleClick}/><label className="full" for={`star3-${this.props.name}`} title="Meh - 3 stars"></label>
                <input type="radio" id={`star2half-${this.props.name}`} name={this.props.name} value={2.5} onClick = {this.handleClick}/><label className="half" for={`star2half-${this.props.name}`} title="Kinda bad - 2.5 stars"></label>
                <input type="radio" id={`star2-${this.props.name}`} name={this.props.name} value={2} onClick = {this.handleClick}/><label className="full" for={`star2-${this.props.name}`} title="Kinda bad - 2 stars"></label>
                <input type="radio" id={`star1half-${this.props.name}`} name={this.props.name} value={1.5} onClick = {this.handleClick}/><label className="half" for={`star1half-${this.props.name}`} title="Meh - 1.5 stars"></label>
                <input type="radio" id={`star1-${this.props.name}`} name={this.props.name} value={1} onClick = {this.handleClick}/><label className="full" for={`star1-${this.props.name}`} title="Sucks big time - 1 star"></label>
                <input type="radio" id={`starhalf-${this.props.name}`} name={this.props.name} value={0.5} onClick = {this.handleClick}/><label className="half" for={`starhalf-${this.props.name}`} title="Sucks big time - 0.5 stars"></label>
            </fieldset>
        )
    }
}
export default RateStars;