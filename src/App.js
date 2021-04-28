import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Header from "./Components/Header/Header";

import ScrollOnTop from "./Components/ScrollIndicator/ScrollOnTop";

import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";
import Ads from "./Components/Advertisement/Ads";

import Footer from "./Components/Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/about" component={Header}/>

            <Route path="/">
              <Header />
              <ScrollOnTop />
              <Ads />
              <Register />
              <Login />
              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
