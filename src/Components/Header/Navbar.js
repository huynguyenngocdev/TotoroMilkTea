import React from "react";
import './Header.css'
class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light scrolling-navbar navbar-transparent">
        <div className="container-fluid">
          <a className="navbar-brand text_brand" href="index.html">
            Totoro Milk Tea
          </a>
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
          <div className="navbar-collapse collapse" id="navbar" style={{}}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-coffee fw"></i>Sản Phẩm
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-shopping-cart fw" aria-hidden="true"></i>
                  Giỏ Hàng
                </a>
              </li>
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
              <li className="nav-item">
                <form className="form-inline">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nhập tên sản phẩm để tìm kiếm..."
                    aria-label="Search"
                  />
                  <button
                    type="button"
                    className="form-control btn btn-outline-primary"
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav">
              <button
                type="button"
                className="btn"
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
