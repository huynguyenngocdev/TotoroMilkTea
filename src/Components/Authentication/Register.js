import React, { Component } from "react";
import $ from "jquery";
import SendEmail from "../../Features/SendEmail"
import callAPI from "../../API/callAPI";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.createAccount = this.createAccount.bind(this)
    // this.checkCode = this.checkCode.bind(this);
  }
 
  randomCode = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  handleChange(event) {
    let key = event.target.name;
    let val = event.target.value;
    this.setState({ [key]: val });
  }

  async createAccount(e) {
    e.preventDefault()
    let code = this.randomCode(10000, 99999)
    console.log(code);
    let email = this.state.email;
    let idLog = this.state.username;
    let resEmail = `users?email=${email}`;
    let resIdLog = `users?username=${idLog}`;
    let x=false,y=false;
    await callAPI(resIdLog, "GET", null).then((res) => {
      let check = res.data;
      if(check.length===0){
        $("#invalid-user").css("color", "#20c997").html("Notice: Tên đăng nhập hợp lệ! ")
        x=true;
      }else{
        $("#invalid-user").css("color", "red").html("Notice: Tên đăng nhập này đã được sử dụng! ")
      }
    }).catch(
     err=>{
      alert("Error: Something is wrong! Maybe the API is having problems");
      console.log("Error: Something is wrong! Maybe the API is having problems");
     },
    );
    await callAPI(resEmail, "GET", null).then((res) => {
      let check = res.data;
      if(check.length===0){
        $("#invalid-email").css("color", "#20c997").html("Notice: Email hợp lệ! ")
       y=true;
      }else{     
        $("#invalid-email").css("color", "red").html("Notice: Email này đã được sử dụng! ")
      }
    }).catch(
     err=>{
      alert("Error: Something is wrong! Maybe the API is having problems");
      console.log("Error: Something is wrong! Maybe the API is having problems");
     },
    );
    if(x&&y){
      let content = `Mã xác nhận của bạn là:${code}`
      SendEmail(email, content).then(() => { alert('Gửi mail thành công')
      let a = prompt("Nhập Mã Xác nhận đã được gửi đến email")
      if(a===code){
        alert("Code chính xác")
        let user=this.state;
        console.log(user);
     callAPI("users", "POST", user).then((res) => {
      localStorage.setItem('currentAccount',JSON.stringify(user));
      window.location.reload()
     }).catch(err=>alert("Error: Something is wrong! Maybe the API is having problems"));
      }else alert("Sai code")
    }).catch(()=>alert("Gửi mail thất bại"))
        
    }

  

  }


  showPasswordR = (event) => {
    event.preventDefault();
    if ($("#pwdR").attr("type") === "text") {
      $("#pwdR").attr("type", "password");
      $("#eye-icon-register").addClass("fa-eye-slash");
      $("#eye-icon-register").removeClass("fa-eye");
    } else if ($("#pwdR").attr("type") === "password") {
      $("#pwdR").attr("type", "text");
      $("#eye-icon-register").removeClass("fa-eye-slash");
      $("#eye-icon-register").addClass("fa-eye");
    }
  };

  render() {
    return (
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title font-weight-bold"
                id="registerModalLabel"
              >
                Tạo tài khoản
              </h2>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="was-validated" onSubmit={this.createAccount}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Họ và tên"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Tên đăng nhập"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                  <div id="invalid-user"></div>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                  <div id="invalid-email"></div>
                  </div>
               
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    name="phonenumber"
                    pattern="[0]{1}[0-9]{9}"
                    placeholder="Điện thoại"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Địa chỉ"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="pwdR"
                      placeholder="Mật khẩu"
                      required
                      onChange={this.handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark input-group-addon"
                      onClick={this.showPasswordR}
                    >
                      <i
                        className="fa fa-eye-slash"
                        id="eye-icon-register"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-success"
                  data-toggle="modal"
                  data-target="#verifyCodeModal"
                  id="add"
                  name="Register"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Register;
