import React, { Component } from "react";
import $ from "jquery";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let key = event.target.name;
    let val = event.target.value;
    this.setState({ [key]: val });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("Đăng ký thành công");
  }

  showPassword = (event) => {
    event.preventDefault();
    console.log($("#pwd").attr("type"));
    if ($("#pwd").attr("type") === "text") {
      $("#pwd").attr("type", "password");
      $("#eye-icon").addClass("fa-eye-slash");
      $("#eye-icon").removeClass("fa-eye");
    } else if ($("#pwd").attr("type") === "password") {
      $("#pwd").attr("type", "text");
      $("#eye-icon").removeClass("fa-eye-slash");
      $("#eye-icon").addClass("fa-eye");
    }
  };

  render() {
    return (
      <div
        className="modal fade"
        id="registerModal"
        tabindex="-1"
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
              <form className="was-validated">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Họ và tên"
                    required
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
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <div className="invalid-feedback">
                    Không được để trống ô này.
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    name="phonenumber"
                    pattern="[0]{1}[0-9]{9}"
                    placeholder="Điện thoại"
                    required
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
                      name="passwordR"
                      id="pwdR"
                      placeholder="Mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-dark input-group-addon"
                      onClick={this.showPassword}
                    >
                      <i
                        className="fa fa-eye-slash"
                        id="eye-icon"
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
                  className="btn btn-info btn-rounded"
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
