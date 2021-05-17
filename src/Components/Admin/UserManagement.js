import callAPI from "API/callAPI";
import React, { Component } from "react";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    callAPI("users", "GET", null).then((res) => {
      this.setState({ users: res.data });
    });
  }

  render() {
    console.log(this.state.users)
    return (
      <div>
      
      </div>
    );
  }
}

export default UserManagement;
