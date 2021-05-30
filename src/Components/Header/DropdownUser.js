import React, { Component } from 'react';
class DropdownUser extends Component {
    logOut = () => {
        localStorage.removeItem("currentAccount")

        sessionStorage.clear()
        window.location.reload();
    }
    render() {
        return (
            <div>
                <div className="dropdown">
                    <button className="btn btn-outline-success   dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Quản Lý Tài Khoản</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item" data-toggle="modal" data-target="#updateUser" >Thay Đổi Thông Tin Người Dùng</div>
                        {/* <ModalEx/> */}

                        <div className="dropdown-item"  data-toggle="modal" data-target="#updatePassword" >Thay Đổi Mật Khẩu</div>
                        <div className="dropdown-item" onClick={this.logOut} >Đăng Xuất</div>
                    </div>
                </div>
            </div >
        );
    }
}

export default DropdownUser;
