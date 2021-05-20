import React, { Component } from 'react'
import callAPI from "../../../API/callAPI"
class AccManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        let user
        user = JSON.parse(localStorage.getItem("currentAccount"))
        this.setState({ currentUser: user })
    }
    async handleChange(event) {
        event.preventDefault()
        let user = JSON.parse(localStorage.getItem("currentAccount"))
        let name = document.getElementById("fullName").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        if (name === "" || phone === "" || address === "") {
            alert("Vui Lòng Nhập Đầy Đủ Thông Tin")
        } else {
            user.name = name;
            user.phonenumber = phone;
            user.address = address;
            this.setState(()=>({ currentUser: user }));
            let endpoint = `users/${this.state.currentUser.id}`
            console.log(user);
            callAPI(endpoint, "PUT", user).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    localStorage.setItem("currentAccount", JSON.stringify(user))
                    alert("Cập nhật User thành công")
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
                <div className="modal fade" id="updateUser" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập Nhật Thông Tin</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="was-validated">
                                    <div className="form-group row" style={{ paddingLeft: "3%", textAlign: 'center' }}>
                                        <strong>Email: {this.state.currentUser ? this.state.currentUser.email : "no data"}</strong>
                                        <p><strong>ID: {this.state.currentUser ? this.state.currentUser.username : "no data"}</strong></p>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="fullName">Họ Và Tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName" name="name"
                                            defaultValue={
                                                this.state.currentUser ? this.state.currentUser.name : "no data"}
                                            required

                                        />
                                        <div className="invalid-feedback">
                                            Không được để trống ô này. </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fullName">Số Điện Thoại</label>
                                        <input type="tel" className="form-control" id="phone" name="phone"
                                            defaultValue={this.state.currentUser ? this.state.currentUser.phonenumber : "no data"}
                                            pattern="[0]{1}[0-9]{9}"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Số điện thoại không hợp lệ
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Địa Chỉ</label>
                                        <input type="text" className="form-control" id="address" name="address"
                                            defaultValue={this.state.currentUser ? this.state.currentUser.address : "no data"}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Không được để trống ô này. </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" onClick={this.handleChange} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default AccManagement;
