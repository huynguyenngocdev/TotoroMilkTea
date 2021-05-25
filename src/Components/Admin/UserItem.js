import React, { Component } from "react";
import { Link } from 'react-router-dom';

class  UserItem extends Component {

    onDelete = (id) => {
        console.log(id,'userid')
        this.props.onDelete(id)
        // if (alert("ban muon xoa?")) {
        //     this.props.onDelete(id)
        // }
    }

    render() {
        var { user, index } = this.props;
        return (
            <tr>
                {/* <td>
                    <input type="checkbox"
                        className=""
                        checked={this.props.checked}
                        onChange={() => this.onSelectUser(user.id)}
                    />
                </td> */}
                <td>{index + 1}</td>
                {/* <td>{user.id}</td> */}
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>{user.address}</td>
               
                <td>
                    <button
                  onClick={()=>this.onDelete(user.id)}
                  type="button"
                  className="btn btn-danger btn-delete">Delete
                  </button>
                  </td>
                <td>
                    <Link to={`user/${user.id}/edit`} className="btn btn-warning mr-10">Update</Link>
                </td>
            </tr>
        )
    }
}
export default UserItem;
