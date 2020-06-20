import React from "react";
import CategoryOverview from "./categoryOverview.js";
class SchoolOverview extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{library:[]},
            title:props.match.params.school
        }
    }

    async componentDidMount(){
        let data = await fetch("/api/schoolOverview/"+this.props.match.params.school);
        data = await data.json();
        this.setState({data:data})
        let schoolTitle = await fetch("/api/search/"+this.props.match.params.school);
        schoolTitle = await schoolTitle.json();
        console.log(schoolTitle);
        this.setState({title: schoolTitle[0].name});
    }

    render(){
        return(
            <div>
                <div id = "schoolBanner">
                    <div id = "imgBannerGradient"/>
                    <div id = "imgBannerOverlay">{this.state.title}</div>
                    <img id ="imgBanner" src = "https://campusranked.s3.us-east-2.amazonaws.com/uwmadison/uwmadison_banner.jpg"/>
                    <div style = {{width:"100%", height: "30px", "background-color":"black"}}></div>
                </div>
                <div style = {{height:"30px"}}/>
                <h3> TOP BUILDINGS</h3>
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