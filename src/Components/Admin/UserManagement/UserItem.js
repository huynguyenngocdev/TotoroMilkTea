import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserItem extends Component {
  onBlock = (index) => {
    this.props.onBlock(index);
  };

  render() {
    var { user, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phonenumber}</td>
        <td>{user.address}</td>
        <td>
          <Link to={`user/${user.id}/edit`} className="btn btn-warning">
            Cập nhật
          </Link>
        </td>
        <td>
          <button onClick={()=>this.onBlock(index)} className='btn btn-outline-danger'>
            {user.status === true || user.status === "true" ? (
              <i className="fas fa-lock"></i>
            ) : (
              <i className="fas fa-lock-open"></i>
            )}
          </button>
        </td>
      </tr>
    );
  }
}
export default UserItem;
