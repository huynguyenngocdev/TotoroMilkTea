import React, { Component } from "react";
import "./Admin.css";
import { NavLink, Route, Switch } from "react-router-dom";
import { amdinRoutes } from "../../routes";

class AdminFunctions extends Component {
  componentDidMount() {
    let path = window.location.pathname;
    let url = window.location.href;
    if (
      path !== "/admin" &&
      path !== "/admin/ads" &&
      path !== "/admin/orders" &&
      path !== "/admin/products" &&
      path !== "/admin/users"
    ) {
      window.location.assign(url.slice(0, url.indexOf("admin")) + "error");
    }
  }

  showContentAdmin = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return result;
  };

  render() {
    return (
      <div className="row admin-style">
        <div className="nav-admin text-center">
          <div className="text-center" style={{ padding: "40px 0" }}>
            <NavLink to={"/"} id="go-homepage" style={{ color: "#b8c7ce" }}>
              <i className="fas fa-arrow-alt-circle-left fw" />
              Về trang chủ
            </NavLink>
          </div>
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <NavLink
              className="nav-link"
              id="v-pills-ads-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-ads"
              aria-selected="true"
              to={`${this.props.match.url}/ads`}
              style={{ color: "#b8c7ce" }}
            >
              Khuyến mãi
            </NavLink>

            <NavLink
              className="nav-link"
              id="v-pills-orders-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-orders"
              aria-selected="false"
              to={`${this.props.match.url}/orders`}
              style={{ color: "#b8c7ce" }}
            >
              Đơn hàng
            </NavLink>

            <NavLink
              className="nav-link"
              id="v-pills-products-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-products"
              aria-selected="false"
              to={`${this.props.match.url}/products`}
              style={{ color: "#b8c7ce" }}
            >
              Sản phẩm
            </NavLink>

            <NavLink
              className="nav-link"
              id="v-pills-users-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-users"
              aria-selected="false"
              to={`${this.props.match.url}/users`}
              style={{ color: "#b8c7ce" }}
            >
              Người dùng
            </NavLink>

            <NavLink
              className="nav-link"
              id="v-pills-logout-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="v-pills-logout"
              aria-selected="false"
              to={`/home`}
              onClick={() => {
                sessionStorage.removeItem("admin");
              }}
              style={{ color: "#b8c7ce" }}
            >
              Đăng xuất
            </NavLink>
          </div>
        </div>

        <div>
          <div className="title-page-admin text-center">TRANG ADMIN</div>
          <div>
            <Switch>{this.showContentAdmin(amdinRoutes)}</Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminFunctions;
