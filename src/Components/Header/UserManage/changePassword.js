import React, { Component } from 'react'
import callAPI from "../../../API/callAPI"
import showPassword from "../../../Features/ShowPassword"
import $ from "jquery"
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        };
        this.changePassword = this.changePassword.bind(this);
    }
    showPasswordNow = (id, idIcon) => {
        showPassword(id, idIcon)
    };
    componentDidMount() {
        let user
        user = JSON.parse(localStorage.getItem("currentAccount"))
        this.setState({ currentUser: user })
    }
    async changePassword(event) {
        event.preventDefault()
        let user = JSON.parse(localStorage.getItem("currentAccount"))
        let oldPwd = document.getElementById("oldPwd").value;
        let newPwd = document.getElementById("newPwd").value;
        let rePwd  = document.getElementById("re-enter-nPwd").value;
        if(user.password===oldPwd){
            $("#status-oldPassword").css("color", "#20c997").html("<p>Notice:  Mật khẩu cũ trùng khớp!</p> ")
               
              }else{
                $("#status-oldPassword").css("color", "red").html("<p>Error: Mật khẩu cũ không chính xác!</p>")
              }
        if(newPwd===rePwd){
            $("#status-newPassword").css("color", "#20c997").html("Notice:  Mật khẩu mới trùng khớp! ")
          }else{
            $("#status-newPassword").css("color", "red").html("Error: Mật Khẩu Mới Không Trùng Khớp!")
          }
        if(user.password===oldPwd&&newPwd===rePwd){
            user.password=newPwd
            this.setState(() => ({ currentUser: user }));
            let endpoint = `users/${this.state.currentUser.id}`
            console.log(user);
            callAPI(endpoint, "PUT", user).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem("currentAccount", JSON.stringify(user))
                    alert("Cập nhật mật khẩu mới thành công")
                    window.location.reload();
                } else {
                    alert("Không Kết Nối Được API. Vui Lòng Kiểm Tra Kết Nối Mạng")
                }
            });
        }
        

        
    }


    render() {

        return (

            <div>
                <div className="modal fade" id="updatePassword" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thay Đổi Mật Khẩu</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Modal Password */}
                                <div className="modal-body">
                                    <form className="was-validated" onSubmit={this.changePassword}>
                                        <div className="form-group">
                                            <label><strong>Mật Khẩu Cũ</strong></label>
                                            <div className="input-group">
                                            
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="passwordL"
                                                    id="oldPwd"
                                                    placeholder="Mật khẩu cũ"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark input-group-addon"
                                                    onClick={() => this.showPasswordNow("oldPwd", "eye-icon-changePwd")}
                                                >
                                                    <i className="fa fa-eye-slash" id="eye-icon-changePwd" aria-hidden="true"></i>
                                                </button>
                                                <div className="invalid-feedback">
                                                    Không được để trống ô này.
                                              
                                                </div>
                                               
                                            </div>
                                            <div id="status-oldPassword"></div>
                                        </div>
                                        {/* New Password */}
                                        <div className="form-group">
                                            <label><strong>Mật Khẩu Mới</strong></label>
                                            <div className="input-group">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="passwordL"
                                                    id="newPwd"
                                                    placeholder="Mật khẩu mới"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark input-group-addon"
                                                    onClick={() => this.showPasswordNow("newPwd", "eye-icon-changeNewPwd")}
                                                >
                                                    <i className="fa fa-eye-slash" id="eye-icon-changeNewPwd" aria-hidden="true"></i>
                                                </button>
                                                <div className="invalid-feedback">
                                                    Không được để trống ô này.
                                                </div>
                                             
                                            </div>
                                             {/* re-enter */}
                                            <div className="input-group">   
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="passwordL"
                                                    id="re-enter-nPwd"
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark input-group-addon"
                                                    onClick={() => this.showPasswordNow("re-enter-nPwd", "eye-icon-re-enter-nPwd")}
                                                >
                                                    <i className="fa fa-eye-slash" id="eye-icon-re-enter-nPwd" aria-hidden="true"></i>
                                                </button>
                                                <div className="invalid-feedback">
                                                    Không được để trống ô này.
                                                </div>
                                                
                                            </div>
                                            <div id="status-newPassword"></div>
                                        </div>


                                        <button
                                            type="submit"
                                            className="btn btn-info btn-rounded"
                                            name="Login"
                                        >
                                            Save
                                         </button>
                                    </form>
                                </div>

                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default ChangePassword;
