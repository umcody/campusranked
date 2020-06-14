import React from "react";
import Ranked from "./components/Ranked.js";
import { Route } from "react-router-dom";
import SearchBar from "./components/searchBar/SearchBar.js";
import Dummy from "./components/dummy";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from "./components/Footer"
import RegisterComplete from "./components/auth/RegisterComplete";
import Profile from "./components/profile/profile.js";
import ForgotPassword from "./components/auth/ForgotPassword.js";
import ResetPassword from "./components/auth/ResetPassword.js";
import HomeProto from "./components/homeProto.js";


import Home from "./components/Home";
import Rating from "./components/ratingSystem/rateRoutes/ReviewPage";
import Review from "./components/ratingSystem/rateRoutes/ReviewPage";
import RateGym from "./components/ratingSystem/rateActionRoutes/RateActionGym";
import RateDiningHall from "./components/ratingSystem/rateActionRoutes/RateActionDiningHall";
import RateLibrary from "./components/ratingSystem/rateActionRoutes/RateActionLibrary";
import "./components/ratingSystem/ratePage.css";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      body: [],
    };
    document.title="CampusRanked";
  }

  logIn() {
    this.setState({ isLoggedIn: true });
  }

  componentDidMount() {
    fetch("/search")
      .then((res) => res.json())
      .then((body) => {
        this.setState({ body });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div id="content">
        <SearchBar searchBody={this.state.body} />
        {/* <Route exact path="/home" component={Home} options={this.state.body} /> */}
        <Route
          exact
          path="/home"
          component={() => <Home options={this.state.body} />}
        />

        <Route exact path="/ranked" component={Dummy} />
        <Route
          exact
          path="/ranked/:item"
          render={(props) => <Ranked {...props} />}
        />
        <Route exact path="/registeruser" component={Register} />
        <Route exact path="/loginuser" component={Login} />
        <Route exact path="/profile" component={Profile}/>
        <Route path ="/forgotPassword" component={ForgotPassword}/>
        <Route path ="/reset/:token" component={ResetPassword}/>
        <Route exact path ="/homeProto" component={HomeProto}/>

        <Route exact path="/rating" component = {Rating}/>
        <Route path = "/detailed/:category/:title/:item" component = {Review}/>
        <Route path = "/rate/gym/:title/:item" component = {RateGym}/>
        <Route path = "/rate/dininghall/:title/:item" component = {RateDiningHall}/>
        <Route path = "/rate/library/:title/:item" component = {RateLibrary}/>
        <Route path = "/registerComplete/:username" component = {RegisterComplete}/>


        <Route
          exact
          path="/"
          component={() => <Home options={this.state.body} />}
        />
        <Footer />

      </div>
    );
  }
}

export default App;
