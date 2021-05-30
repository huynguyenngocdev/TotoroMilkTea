import React from "react";
import "./Header.css";
import Title from "./Title";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import { BrowserRouter as Link } from "react-router-dom";
class Header extends React.Component {
  render() {
    return (
      <header id="top">
        <Title />
        <Link to="/">
          <div className="text-center">
            <img src="/logo.jpg" width={100} className="img-fluid" alt="logo" />
            <img
              src="/head_logo.jpg"
              width={300}
              className="img-fluid"
              alt="logo"
            />
          </div>
        </Link>
        <Navbar/>
        <Carousel />
      </header>
    );
  }
}

export default Header;
