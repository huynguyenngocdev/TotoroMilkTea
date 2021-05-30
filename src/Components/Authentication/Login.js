import React, { Component } from "react";
import $ from "jquery";
import callAPI from "../../API/callAPI";
import showPassword from "../../Features/ShowPassword";
import './styleAuthentication.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: null,
    };
    this.checkLogin = this.checkLogin.bind(this);
  }

  showPasswordNow = (id, idIcon) => {
    showPassword(id, idIcon);
  };
  //console.log(document.getElementById("pwdL").getAttribute('type'));

  checkLogin = (event) => {
    event.preventDefault();
    let user = $("#userL").val();
    let pw = $("#pwdL").val();
    //http://totoromilkteaapi.herokuapp.com/api/users?username=admin&&password=admin
    let endpoint = `users?username=${user}&&password=${pw}`;
    var check = null;
    if (user === "admin" && pw === "admin") {
      sessionStorage.setItem(
        "admin",
        "0356ef04b426649da842b8120640953e3be097a551111355d2b6739e4e8042b2"
      );
      this.setState({ redirect: "/admin" });
    } else {
      callAPI(endpoint, "GET", null)
        .then((res) => {
          check = res.data;
          if (check.length === 0) {
            $("#incorrect-user,.mess-incorrect-user").css("color", "red");
            $("#incorrect-user,.mess-incorrect-user").html(
              "Error: Tài khoản hoặc mật khẩu không chính xác!"
            );
          }
          if (check[0].status === true) {
            alert(
              "Tài khoản của bạn đang bị khóa! Vui lòng gọi điện cho admin qua sđt 0355621838 để mở khóa tài khoản."
            );
            window.location.reload();
          } else {
            $("#incorrect-user,.mess-incorrect-user").css("color", "#20c997");
            $("#incorrect-user,.mess-incorrect-user").html(
              "Notice: Tài khoản và mật khẩu trùng khớp! "
            );
            check.forEach((val) => {
              localStorage.setItem("currentAccount", JSON.stringify(val));
              window.location.reload();
            });
          }
        })
        .catch((err) => {
          alert("Error: Something is wrong! Maybe the API is having problems");
          console.log(
            "Error: Something is wrong! Maybe the API is having problems"
          );
        });
      this.setState({ redirect: null });
    }
  };

  getValue = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    if (this.state.redirect) {
      return window.location.assign("./admin");
    }
    return (
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title font-weight-bold" id="loginModalLabel">
                Đăng nhập
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
              <form className="was-validated" onSubmit={this.checkLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="userL"
                    placeholder="Tên đăng nhập"
                    required
                    onChange={this.getValue}
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
                      name="passwordL"
                      id="pwdL"
                      placeholder="Mật khẩu"
                      required
                      onChange={this.getValue}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark input-group-addon"
                      onClick={() =>
                        this.showPasswordNow("pwdL", "eye-icon-login")
                      }
                    >
                      <i
                        className="fa fa-eye-slash"
                        id="eye-icon-login"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                    <div className="forgotPassword">
                      <span data-toggle="modal" data-target="#forgotPwModal">
                        Quên Mật Khẩu?
                      </span>
                    </div>
                  </div>
                  <div id="incorrect-user"></div>
                </div>

                <button
                  type="submit"
                  className="btn btn-info btn-rounded"
                  id="checkAcc"
                  name="Login"
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
