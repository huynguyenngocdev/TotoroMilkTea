import callAPI from "API/callAPI";

import React, { Component } from "react";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const actAddUserRequest = async (user) => {
  return await callAPI(`users`, "POST", user).then(res =>
    res.status
  );
}

const onUpdateUser = async (id, user) => {
  return await callAPI(`users/${id}`, "PUT", user);
}

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: null,
      password: null,
      name: null,
      email: null,
      address: null,
      phonenumber: null,
      status: null
    };
  }

  async componentDidMount() {
    var { match } = this.props;
    if (match) {  // kiểm tra có match props ko
      var id = Number(match.params.id);
      // có params.id thi lay user do ve va ngan cho state
      await callAPI(`users/${id}`, "GET", null).then((res) => {
        this.setState({
          id: res.data.id,
          username: res.data.username,
          name: res.data.name,
          email: res.data.email,
          address: res.data.address,
          phonenumber: res.data.phonenumber,
          password: res.data.password,
          status: res.data.status
        })
      });
    }
  }

  validateInput = (checkingText) => {
    const regexp = /^\d{10,11}$/;
    const checkingResult = regexp.exec(checkingText);
    return checkingResult;

  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }


  onSave = (e) => {
    e.preventDefault();
    const {
      id,
      username,
      password,
      name,
      email,
      address,
      phonenumber,
      status } = this.state;
    // tạo user và lấy data tu state 
    if (this.validateInput(phonenumber) !== null) {//viet them ham validate roi bo vao lenh if nay
      var user = {
        id: id,
        username: username,
        password: password,
        name: name,
        email: email,
        address: address,
        phonenumber: phonenumber,
        status: status
      }
      if (this.props.match) {
        onUpdateUser(id, user);
      } else {
        actAddUserRequest(user);
      }
      history.goBack(); // quay lại trang trước
    }
    else {
      alert('Số điện thoại phải có 10 - 11 chữ số.')
      this.setState({phonenumber: null})
    }

    console.log(user)
    // nếu có id user được truyền tới thì update , ngược lại thì add
   
  }

  goBack = () => {
    history.goBack();
  }

  render() {
    const {
      username,
      name,
      email,
      address,
      phonenumber,
      status } = this.state;
    return (

      <div className="form-center">
        <form onSubmit={this.onSave}>
          <div className="form-row ">
            <div className="form-group col-md-6">
              <label>UserName:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username || ""}
                onChange={this.onChange}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name || ""}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-row ">
            <div className="form-group col-md-8">
              <label>Email:</label>
              <input
                type="email"
                className="form-control "
                name="email"
                value={email || ""}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label>Phone:</label>
              <input
                type="text"
                className="form-control"
                name="phonenumber"
                value={phonenumber || ""}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address || ""}
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn" onClick={this.goBack}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default UpdateUser;
