import callAPI from "API/callAPI";
import SendEmail from "Features/SendEmail";

import React, { Component } from "react";
import UserItem from "./UserItem";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.onBlock = this.onBlock.bind(this);
  }

  async componentDidMount() {
    await callAPI("users", "GET", null).then((res) => {
      this.setState({ users: res.data });
    });
  }

  onBlock = async (index) => {
    let user = this.state.users[index];
    console.log(user.status);
    if (user.status === true || user.status === "true") {
      user.status = false;
    } else {
      user.status = true;
    }

    //console.table(index, user.status);
    await callAPI(`users/${user.id}`, "PUT", user);
    await callAPI("users", "GET", null).then((res) => {
      this.setState({ users: res.data });
    });

    let message = user.status
      ? "Tài khoản của bạn đã bị khóa! Vui lòng gọi điện cho admin qua sđt 0355621838 để mở khóa tài khoản."
      : "Tài khoản của bạn đã được mở khóa! Bây giờ bạn có thể đăng nhập vào hệ thống.";

    await SendEmail(user.email, message)
      .then(() => {
        alert("Đã thông báo cho khách hàng!");
      })
      .catch(() => {
        alert("Thông báo cho khách hàng thất bại!");
      });

    window.location.reload();
  };

  render() {
    const { users } = this.state;
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">LIST USER</h3>
        </div>
        <div className="panel-body">
          <table className="table text-center table-bordered table-hover">
            <thead>
              <tr>
                <th>ID User</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <UserItem
                    key={index}
                    user={user}
                    index={index}
                    checked={this.state.users.includes(user.id)} //de truyen t/tinh cho the input vao ProductItem
                    onBlock={this.onBlock}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserManagement;
