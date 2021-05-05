import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import OrderManagement from "./OrderManagement";
import UserManagement from "./UserManagement";
 
class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="adminpage">
          <NavLink type="button" className="btn btn-lg btn-primary" to="/">
            Về trang chủ
          </NavLink>
        </div>

        {/* nav tabs  */}
        <div className="container-fluid d-flex flex-row mb-3">
          <div
            className="nav flex-column nav-pills col-2"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
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

          {/* tabs */}
          <div className="tab-content col-10" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-order"
              role="tabpanel"
              aria-labelledby="v-pills-order-tab"
            >
              <OrderManagement />
            </div>

            <div
              className="tab-pane fade"
              id="v-pills-product"
              role="tabpanel"
              aria-labelledby="v-pils-product-tab"
            >
            
            </div>

            <div
              className="tab-pane fade"
              id="v-pills-ads"
              role="tabpanel"
              aria-labelledby="v-pills-ads-tab"
            >
            </div>

            <div
              className="tab-pane fade"
              id="v-pills-user"
              role="tabpanel"
              aria-labelledby="v-pills-user-tab"
            >
              <UserManagement />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
