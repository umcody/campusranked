import React from "react";
import CategoryOverview from "./categoryOverview.js";
//import MapComponent from "./mapComponent.js";

class SchoolOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { library: [] },
            school: {},
            title: props.match.params.school,
            overallRating: {
                library: 0,
                dininghall: 0,
                gym: 0,
                residentialhall: 0
            }
        }
    }

    async componentDidMount() {
        let data = await fetch("/api/schoolOverview/" + this.props.match.params.school);
        data = await data.json();
        this.setState({ data: data })

        let school = await fetch("/api/search/" + this.props.match.params.school);
        school = await school.json();
        this.setState({ title: school[0].name });
        this.setState({ school: school[0] });
    }

    render() {
        const schoolLowered = this.props.match.params.school.toLowerCase();
        return (
            <div className = "onePage">
                <div id="schoolBanner">
                    <img id="imgBanner" src={`https://campusranked.s3.us-east-2.amazonaws.com/${schoolLowered}/${schoolLowered}_banner.jpg`} />

                    <div className = "divider">
                        <div id="title" className="noBreak">
                            <h1>{this.state.title}</h1>
                        </div>
                        <div id="sub">
                            {`Public: ${this.state.school.public} / State: ${this.state.school.state}`}
                        </div>
                    </div>
                </div>
                <div style={{ height: "30px" }} />
                {/*<MapComponent latitude = {this.state.school.latitude} longitude = {this.state.school.longitude}/>*/}
                {/*<h4> Top Buildings In Each Category</h4>*/}
                <div id="rankOverviewContainer">
                    <CategoryOverview school={schoolLowered} category="Residentialhall" items={this.state.data.residentialhall} />
                    <CategoryOverview school={schoolLowered} category="Library" items={this.state.data.library} />
                    <CategoryOverview school={schoolLowered} category="Dininghall" items={this.state.data.dininghall} />
                    <CategoryOverview school={schoolLowered} category="Gym" items={this.state.data.gym} />

                </div>
            </div>
        )
    }
}

export default SchoolOverview