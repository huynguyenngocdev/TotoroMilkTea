import React, { Component } from "react";
import Navbar from "../../Header/Navbar";
import { Link } from "react-router-dom";

class Bill extends Component {
  render() {
    let item = JSON.parse(sessionStorage.getItem("bills"));
    if (localStorage.getItem("currentAccount") && item) {
      return (
        <div>
          <Navbar />
          <div id="bill-container" className="container">
            <div className="row">
              <div className="col-3">
                <h5>Đơn hàng</h5>
                <p>
                  <b>Tài khoản đặt: </b> {JSON.parse(localStorage.getItem('currentAccount')).username}
                </p>
                <p>
                  <b>Người nhận: </b> {item.billname}
                </p>
                <p>
                  <b>SĐT: </b> {item.billphone}
                </p>
                <p>
                  <b>Địa chỉ nhận: </b> {item.billaddress}
                </p>
                <p>
                  <b>Email: </b> {item.billemail}
                </p>
                <p>
                  <b>Ngày mua: </b> {item.billdate}
                </p>
                <p>
                  <b>Tổng tiền: </b>
                  {item.billtotal.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                  VND
                </p>
              </div>
              <div className="col-9">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">Tên</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng(ly)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products.map((el,index) => (
                      <tr key={index}>
                        <td>{el.name}</td>
                        <td>
                          {el.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>{el.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='text-center'><Link to='/' className='btn btn-success'>Về trang chủ</Link></div>
        </div>
      );
    } else {
      window.location.assign("/error");
    }
  }
}
export default Bill;
