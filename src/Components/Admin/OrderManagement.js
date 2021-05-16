import React, { Component } from "react";

class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    };
    this.changFlag = this.changFlag.bind(this);
  }

  changFlag() {
    if (this.state.flag === true) {
      this.setState(() => ({
        flag: false,
      }));
    } else {
      this.setState(() => ({
        flag: true,
      }));
    }
    console.log(this.state.flag);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.changFlag}
        >
          {this.state.flag === true ? "Booking" : "Book"}
        </button>
      </div>
    );
  }
}

export default OrderManagement;
