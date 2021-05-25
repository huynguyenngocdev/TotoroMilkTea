import callAPI from "API/callAPI";

import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
const onListUser = async () => {
  return await callAPI(`users`, "GET", null).then(res => res.data);
}


class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: null,
      password: null,
      role: null,
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
          role: res.data.role,
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
      role,
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
        role: role,
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
      password,
      role,
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
                required
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
                type="number"
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

          <div className="form-row ">
            <div className="form-group col-md-6">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                autoComplete="current-password"
                value={password || ""}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Role:</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value={role || ""}
                onChange={this.onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <input
              type="boolean"
              className="form-control"
              name="status"
              value={status || ""}
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn" onClick={this.goBack}>Cancel</button>
        </form>

        {/* <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input type="password" className="form-control" id="inputPassword4" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form> */}
      </div>
    );
  }
}

export default AddUser;
