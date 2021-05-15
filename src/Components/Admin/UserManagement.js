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
        <form action method="post">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>ID User</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$IDuser</td>
                <td>$Name</td>
                <td>$UserName</td>
                <td>$Email</td>
                <td>$PhoneNumber</td>
                <td>$Address</td>
                <td>$IDuser</td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default UserManagement;
