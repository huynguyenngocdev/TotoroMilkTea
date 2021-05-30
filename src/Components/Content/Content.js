import React, { Component } from "react";
import AllProducts from "./Products/AllProducts";
class Content extends Component {
  render(props) {
    return (
      <div id='products'>
        <AllProducts/>
      </div>
    );
  }
}
export default Content;
