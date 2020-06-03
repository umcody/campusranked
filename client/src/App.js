import React from "react";
import Ranked from "./components/Ranked.js";
import { Route } from "react-router-dom";
import SearchBar from "./components/searchBar/SearchBar.js";
import Dummy from "./components/dummy";
import Register from "./components/Register";
import Login from "./components/Login";

import Home from "./components/Home";
import Rating from "./components/ratingSystem/rateRoutes/RateGym";
import ReviewGym from "./components/ratingSystem/rateRoutes/RateGym";
import RateGym from "./components/ratingSystem/RateAction";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      body: [],
    };
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

        <Route exact path="/rating" component = {Rating}/>
        <Route path = "/detailed/:category/:title/:item" component = {ReviewGym}/>
        <Route path = "/rate/:category/:title/:item" component = {RateGym}/>
      </div>
    );
  }
}

export default App;
