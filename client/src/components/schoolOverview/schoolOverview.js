import React from "react";
import CategoryOverview from "./categoryOverview.js";
class SchoolOverview extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{library:[]}
        }
    }

    async componentDidMount(){
        let data = await fetch("/api/schoolOverview/"+this.props.match.params.school);
        console.log(this.props.match.params.school);
        data = await data.json();
        this.setState({data:data})
        console.log(this.state.data);
    }

    render(){
        return(
            <div>
                <div id = "schoolBanner">
                    <div id = "imgBannerOverlay">{this.props.match.params.school}</div>
                    <img id ="imgBanner" src = "https://campusranked.s3.us-east-2.amazonaws.com/uwmadison/uwmadison_banner.jpg"/>

                </div>
                <div style = {{height:"30px"}}/>
                <div id = "rankOverviewContainer">
                  <CategoryOverview school = {this.props.match.params.school} category = "Library"  items = {this.state.data.library}/>
                  <CategoryOverview school = {this.props.match.params.school} category = "Dininghall" items = {this.state.data.dininghall}/>
                  <CategoryOverview school = {this.props.match.params.school} category = "Gym" items = {this.state.data.gym}/>
                </div>
            </div>
        )
    }
}

export default SchoolOverview