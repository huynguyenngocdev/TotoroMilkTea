import React, { Component } from "react";
import './Products.css'
class Products extends Component {
  Products = [];
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="container">
        <p className='title_products'><span>Trà sữa</span></p>
        {/* <section className="row"></section> */}
      </div>
    );
  }
}

export default Products;