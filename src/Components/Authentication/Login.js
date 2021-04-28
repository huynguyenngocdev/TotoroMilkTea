import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="loginModal"
        tabindex="-1"
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
              <form className="was-validated">
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
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      name="passwordL"
                      id="pwdL"
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
