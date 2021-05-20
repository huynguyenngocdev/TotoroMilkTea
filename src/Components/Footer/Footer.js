import React from "react";
import "./Footer.css";
import Images from "Constants/images";
import sendEmail from "../../Features/SendEmail";

import $ from "jquery";
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitReceiveInfor = this.handleSubmitReceiveInfor.bind(this);
  }

  handleSubmitReceiveInfor(e) {
    e.preventDefault();
    if ($("#emailReceiveNewInfor").val() !== "") {
      let emailReceiveNewInfor = $("#emailReceiveNewInfor").val();
      let contentEmail =
        "Cảm ơn quý khách đã đăng ký để nhận thông tin mới nhất từ shop.";
      sendEmail(emailReceiveNewInfor, contentEmail)
        .then((res) => {
          alert("Gửi email thành công");
        })
        // Handle errors here however you like, or use a React error boundary
        .catch((err) => console.error("Đã có lỗi xảy ra! Lỗi: " + err));
    }else alert('Bạn chưa nhập địa chỉ email đăng ký nhận thông tin.')
  }

  render() {
    return (
      <div className="footer">
        <div className="footer-info">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="footer-logo">
                  <img
                    src={Images.sldZero}
                    alt="Totoro Milk Tea"
                    className="w-100"
                  />
                  <p className="text-left">Totoro Milk Tea</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <h4 className="title">
                  Thông Tin
                  <strong> Liên Hệ</strong>
                </h4>
                <p>101B, Lê Hữu Trác, Đà Nẵng</p>
                <p>0355 621 838</p>
                <p>huy.nguyen22@student.passerellesnumeriques.org</p>
              </div>
              <div className="col-md-3 col-sm-6">
                <h6 className="title">
                  Hỗ Trợ
                  <strong> Khách Hàng</strong>
                </h6>
                <ul className="support">
                  <li>
                    <a href="/">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="/">Phương Thức Thanh Toán</a>
                  </li>
                  <li>
                    <a href="/">Thông Tin</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h6 className="title">
                  Nhận Thông Tin
                  <strong> Mới nhất</strong>
                </h6>
                <p>Nhập Email đăng ký nhận thông tin</p>

                <form
                  className="newsletter form-inline"
                  onSubmit={this.handleSubmitReceiveInfor}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      id="emailReceiveNewInfor"
                      className="form-control"
                      placeholder="Nhập Email...."
                    />
                    <button
                      type="submit"
                      className="btn btn-sm btn-outline-light"
                    >
                      Đăng ký
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-info">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <p>
                  ©2021 Copyright by
                  <a href="https://www.facebook.com/ulrich.stern.319452/">
                    {" "}
                    Nguyễn Ngọc Huy &amp; Nguyễn Thị Diễm <br /> &amp; Lê Thị
                    Hồng Hạnh &amp; Phạm Anh Tuấn{" "}
                  </a>
                </p>
              </div>
              <div className="col-md-5">
                <ul className="social-icon">
                  <li>
                    <a
                      href="mailto:huy.nguyen22@student.passerellesnumeriques.org"
                      className="google-plus"
                    >
                      email
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/nguy%E1%BB%85n-ng%E1%BB%8Dc-huy-363b26207/"
                      className="linkedIn"
                    >
                      linkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/ulrich.stern.319452/"
                      className="facebook"
                    >
                      FB
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/Nagamaru8" className="twitter">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
