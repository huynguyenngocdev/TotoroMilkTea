import callAPI from "API/callAPI";

import React, { Component } from "react";
import UserItem from './UserItem';

import { Link } from 'react-router-dom';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const actDeleteUserRequest = async (id) => {
    return await callAPI(`users/${id}`, "DELETE", null)
}

class UserManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      
    }
  }

  async componentDidMount() {
    await callAPI("users", "GET", null).then((res) => { this.setState({ users: res.data }) })
    console.log(this.state.users, '123');
  }

  onDelete = async (id) => {
    console.log(id,"id")
    actDeleteUserRequest(id);
    await callAPI("users", "GET", null).then((res) => { this.setState({ users: res.data }) })
  }

  render() {
    const { users } = this.state; 
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">LIST USER</h3>
        </div>
        <div className="panel-body">
          
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID User</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th colSpan="3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <>
                  <UserItem
                    key={index}
                    user={user}
                    index={index}
                    checked={this.state.users.includes(user.id)} //de truyen t/tinh cho the input vao ProductItem
                    onDelete={this.onDelete}
                  />
                  </>
                );
              })}
            </tbody>
          </table>
          <Link to="user/add" className="btn btn-success mb-10" history={history} >Add New User</Link>
        </div>
      </div>
    );
  }
}

export default UserManagement;