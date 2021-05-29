import React, { Component } from "react";
import "./order.css";
import callAPI from '../../../API/callAPI'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      total: 0,
    };
  }

  async componentDidMount(){
      const cart = localStorage.getItem('carts')
      console.log(cart)
      //await 
  }

  render() {
    return (
      <div id="cart">
        <h1>abc</h1>
      </div>
    );
  }
}

export default Cart;
