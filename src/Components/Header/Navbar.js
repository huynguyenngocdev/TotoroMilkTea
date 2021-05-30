import React from "react";
import "./Header.css";
import DropdownUser from "./DropdownUser";
import { Link } from "react-router-dom";
import $ from "jquery";
class Navbar extends React.Component {
  searchProducts(e) {
    e.preventDefault();
    let searchValue = $("#search").val();
    if (searchValue === "") {
      alert("Bạn chưa nhập gì cả, vui lòng nhập tên sản phẩm muốn tìm!");
    } else {
      localStorage.setItem("searchProduct", searchValue);
      window.location.assign(`/search`);
    }
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light scrolling-navbar navbar-transparent"
        id="navbar-header"
      >
        <div className="container-fluid">
          <Link className="navbar-brand text_brand" to="/">
            Totoro Milk Tea
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="navbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => {
                    document.getElementById("products").scrollIntoView({
                      behavior: "smooth",
                      inline: "nearest",
                    });
                  }}
                >
                  <i className="fas fa-coffee fw" />
                  Sản Phẩm
                </span>
              </li>
              {localStorage.getItem("currentAccount") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i
                      className="fas fa-shopping-cart fw"
                      aria-hidden="true"
                    ></i>
                    Giỏ Hàng
                    <div className="count-cart">{sessionStorage.getItem('countCart')||0}</div>
                  </Link>
                </li>
              ) : (
                ""
              )}

              <li className="nav-item form-inline mr-3 ml-2">
                <div className="form-group">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <select className="form-control" defaultValue="Đà Nẵng">
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  </select>
                </div>
              </li>
              <li className="nav-item form-inline">
                <form className="form-inline" onSubmit={this.searchProducts}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nhập tên sản phẩm để tìm kiếm..."
                    id="search"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    className="form-control btn btn-outline-primary"
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
              </li>
            </ul>
            <br />
            <ul className="navbar-nav">
              {!localStorage.getItem("currentAccount") ? (
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    Đăng nhập
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-toggle="modal"
                    data-target="#registerModal"
                  >
                    Đăng ký
                  </button>
                </div>
              ) : (
                <div className="AfterLogin">
                  <div
                    className="btn-group"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <DropdownUser />
                    &emsp;
                    {JSON.parse(localStorage.getItem("currentAccount")).name}
                    {/* <button onClick={this.logOut} type="button" className="btn btn-outline-danger">
                  Đăng Xuất</button> */}
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
