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
        console.log(school);
        this.setState({ title: school[0].name });
        this.setState({ school: school[0] });
    }

    render() {
        return (
            <div>
                <div id="schoolBanner">
                    <div id="imgBannerGradient" />
                    <div id="imgBannerOverlay">
                        <div id="imgBannerOverlayTitle">
                            {this.state.title}
                        </div>
                        <div id="imgBannerOverlaySub">
                            {`Public: ${this.state.school.public} / State: ${this.state.school.state}`}
                        </div>
                    </div>

                    <img id="imgBanner" src={`https://campusranked.s3.us-east-2.amazonaws.com/${this.props.match.params.school}/${this.props.match.params.school}_banner.jpg`}/>
                    <div style={{ width: "100%", height: "30px", "background-color": "black" }}></div>
                </div>
                <div style={{ height: "30px" }} />
                {/*<MapComponent latitude = {this.state.school.latitude} longitude = {this.state.school.longitude}/>*/}
                <h3> Top Buildings In Each Category</h3>
                <div id="rankOverviewContainer">
                    <CategoryOverview school={this.props.match.params.school} category="Residentialhall" items={this.state.data.residentialhall} />
                    <CategoryOverview school={this.props.match.params.school} category="Library" items={this.state.data.library} />
                    <CategoryOverview school={this.props.match.params.school} category="Dininghall" items={this.state.data.dininghall} />
                    <CategoryOverview school={this.props.match.params.school} category="Gym" items={this.state.data.gym} />

                </div>
            </div>
        )
    }
}

export default SchoolOverview