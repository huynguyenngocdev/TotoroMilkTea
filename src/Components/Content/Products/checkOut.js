import React, { Component } from "react";
import Navbar from "../../Header/Navbar";

import callAPI from "../../../API/callAPI";
import SendEmail from "Features/SendEmail";

class checkOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("currentAccount")) || [],
      cart: JSON.parse(sessionStorage.getItem("carts")) || [],
      perDis: parseFloat(sessionStorage.getItem("percentDiscount")) || 0,
      countCart: parseInt(sessionStorage.getItem("countCart")) || 0,
      deliveryAddress: {},
    };
    this.onAddBill = this.onAddBill.bind(this);
  }

  componentDidMount() {
    this.setState({
      cart: JSON.parse(sessionStorage.getItem("carts")) || [],
      perDis: parseFloat(sessionStorage.getItem("percentDiscount")) || 0,
      countCart: parseInt(sessionStorage.getItem("countCart")) || 0,
    });
  }
  //----------BILL PRODUCT---------//
  async onAddBill(e) {
    e.preventDefault();
    let billname = e.target["bill-name"].value;
    let billphone = e.target["bill-phone"].value;
    let billaddress = e.target["bill-address"].value;
    let billemail = e.target["bill-email"].value;

    let productBought = [];
    this.state.cart.slice().forEach((item) => {
      productBought.push(item.name);
    });

    let quantityBought = [];
    this.state.cart.slice().forEach((item) => {
      quantityBought.push(item.quantity);
    });

    let now = new Date();
    //post orders on API
    let order = {
      id: now.getTime(),
      customerName: this.state.user.name,
      productBought: productBought,
      quantity: quantityBought,
      total: JSON.parse(sessionStorage.getItem("total")),
      buyAt: now.toLocaleString(),
      deliveryAddress: billaddress,
      status: 0,
    };

    await callAPI("orders", "POST", order).then(() => {
      alert("Đặt hàng thành công! Vui lòng chuẩn bị tiền khi để nhận hàng.");
    });
    // create bill
    let bill = {
      billname: billname,
      billphone: billphone,
      billaddress: billaddress,
      billemail: billemail,
      products: JSON.parse(sessionStorage.getItem("carts")),
      billdate: now.toLocaleString(),
      billtotal: JSON.parse(sessionStorage.getItem("total")),
    };

    sessionStorage.setItem("bills", JSON.stringify(bill));
    sessionStorage.removeItem("carts");
    sessionStorage.removeItem("total");
    sessionStorage.removeItem("countCart");
    await SendEmail(
      bill.billemail,
      `Quý khách đã đặt hàng vào lúc ${
        bill.billdate
      } và mã đơn là ${now.getTime()}.
      Đơn hàng của quý khách đang chờ xử lý.
      Quý khách sẽ nhân được hàng trong 30 phút nữa.
      Cảm ơn quý khách đã đặt hàng.`
    );
    window.location.assign("/bill");
  }

  render() {
    if (localStorage.getItem("currentAccount")) {
      return (
        <div>
          <Navbar />
          <div className="container">
            <div className="py-5 text-center">
              <h2>Thanh toán</h2>
            </div>

            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Giỏ hàng</span>
                  <span className="badge badge-secondary badge-pill">
                    {sessionStorage.getItem("countCart") || 0}
                  </span>
                </h4>
                <ul className="list-group mb-3">
                  {this.state.cart.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between lh-condensed"
                    >
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">x {item.quantity}</small>
                      </div>
                      <span className="text-muted">
                        {(
                          parseFloat(item.price) * parseFloat(item.quantity) -
                          (parseFloat(item.price) *
                            parseFloat(item.quantity) *
                            this.state.perDis) /
                            100
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </li>
                  ))}

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tổng (VND)</span>
                    <strong>
                      {JSON.parse(
                        sessionStorage.getItem("total")
                      ).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </strong>
                  </li>
                </ul>
              </div>

              {/* ------------ form enter delivery address --------- */}
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Địa chỉ giao hàng</h4>
                <form className="was-validated" onSubmit={this.onAddBill}>
                  <div className="mb-3">
                    <label htmlFor="bill-name"> Tên người nhận</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bill-name"
                      defaultValue={this.state.user.name}
                      required
                    />
                    <div className="invalid-feedback">
                      Vui lòng nhập tên người nhận.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bill-phone"> Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bill-phone"
                      defaultValue={this.state.user.phonenumber}
                      required
                    />
                    <div className="invalid-feedback">
                      Vui lòng nhập số điện thoại hợp lệ.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bill-email">Email </label>
                    <input
                      type="text"
                      className="form-control"
                      name="bill-email"
                      defaultValue={this.state.user.email}
                      required
                    />
                    <div className="invalid-feedback">
                      Vui lòng nhập địa chỉ email hợp lệ.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bill-address">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bill-address"
                      defaultValue={this.state.user.address}
                      required
                    />
                    <div className="invalid-feedback">
                      Vui lòng nhập địa chỉ giao hàng.
                    </div>
                  </div>
                  <hr className="mb-4" />

                  <button
                    type="submit"
                    className="btn btn-success btn-lg btn-block"
                  >
                    Thanh toán khi nhận hàng
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      window.location.assign("/error");
    }
  }
}

export default checkOut;
