import React, { Component } from "react";
import Header from "../Components/Header/Header";

import ScrollOnTop from "../Components/ScrollIndicator/ScrollOnTop";

import Register from "../Components/Authentication/Register";
import Login from "../Components/Authentication/Login";
import Ads from '../Components/Advertisement/Ads';

import Footer from "../Components/Footer/Footer";

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <ScrollOnTop />
        <Ads />
        <Register />
        <Login />
        <Footer />
      </div>
    );
  }
}

export default Homepage;
