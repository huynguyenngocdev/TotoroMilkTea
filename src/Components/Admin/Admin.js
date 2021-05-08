import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
import AdsManagement from './AdsManagement'
import "./Admin.css";
class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row admin-style">
        <div className="nav-admin text-center">
          <div className="text-center" id="go-homepage">
            <i className="fas fa-arrow-alt-circle-left fw text-center" /> Về
            trang chủ
          </div>
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              className="nav-link"
              id="v-pills-ads-tab"
              data-toggle="pill"
              href="#v-pills-ads"
              role="tab"
              aria-controls="v-pills-ads"
              aria-selected="false"
            >
              Khuyến mãi
            </a>
            <a
              className="nav-link active"
              id="v-pills-order-tab"
              data-toggle="pill"
              href="#v-pills-order"
              role="tab"
              aria-controls="v-pills-order"
              aria-selected="true"
            >
              Đơn hàng
            </a>
            <a
              className="nav-link"
              id="v-pills-product-tab"
              data-toggle="pill"
              href="#v-pills-product"
              role="tab"
              aria-controls="v-pills-product"
              aria-selected="false"
            >
              Sản phẩm
            </a>
            <a
              className="nav-link"
              id="v-pills-user-tab"
              data-toggle="pill"
              href="#v-pills-user"
              role="tab"
              aria-controls="v-pills-user"
              aria-selected="false"
            >
              Người dùng
            </a>
          </div>
        </div>
        <div>
          <div className="title-page-admin text-center">TRANG ADMIN</div>
          <div>
            <AdsManagement/>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
