import React from "react";
import "./rateStar.css"

class RateStarsTest extends React.Component {
    constructor() {
        super();
    }

    handleClick(event) {
        
    }

    render() {
        return (
            <fieldset id ="asdf" className="rating one">
                <input type="radio" id="stars5" name="rating1" value="5" /><label className="full" for="stasr5" title="Awesome - 5 stars"></label>
                <input type="radio" id="stars4half" name="rating1" value="4 and a half" /><label className="half" for="stars4half" title="Pretty good - 4.5 stars"></label>
                <input type="radio" id="stars4" name="rating1" value="4" /><label className="full" for="stars4" title="Pretty good - 4 stars"></label>
                <input type="radio" id="stars3half" name="rating1" value="3 and a half" /><label className="half" for="stars3half" title="Meh - 3.5 stars"></label>
                <input type="radio" id="stars3" name="rating1" value="3" /><label className="full" for="stars3" title="Meh - 3 stars"></label>
                <input type="radio" id="stars2half" name="rating1" value="2 and a half" /><label className="half" for="stars2half" title="Kinda bad - 2.5 stars"></label>
                <input type="radio" id="stars2" name="rating1" value="2" /><label className="full" for="stars2" title="Kinda bad - 2 stars"></label>
                <input type="radio" id="stars1half" name="rating1" value="1 and a half" /><label className="half" for="stars1half" title="Meh - 1.5 stars"></label>
                <input type="radio" id="stars1" name="rating1" value="1" /><label className="full" for="stars1" title="Sucks big time - 1 star"></label>
                <input type="radio" id="starshalf" name="rating1" value="half" /><label className="half" for="starshalf" title="Sucks big time - 0.5 stars"></label>
            </fieldset>
        )
    }
}
export default RateStarsTest;