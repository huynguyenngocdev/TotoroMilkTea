import React, { Component } from "react";
import "./order.css";
import { Link } from "react-router-dom";
import callAPI from "../../../API/callAPI";
import Navbar from "../../Header/Navbar";

class Cart extends Component {
  constructor() {
    super();
    this.removeCart = this.removeCart.bind(this);

    this.state = {
      cart: JSON.parse(sessionStorage.getItem("carts")) || [],
      imageProducts: [],
      perDis: sessionStorage.getItem("percentDiscount") || 0,
      total: 0,
    };
  }

  removeCart(key) {
    return (event) => {
      let newArr = JSON.parse(sessionStorage.getItem("carts"));
      newArr.splice(key, 1);
      //count quantity
      let count = 0;
      count = newArr.map((item) => (count += parseInt(item.quantity)));
      sessionStorage.setItem("countCart", count);

      this.setState({
        cart: newArr,
      });
    };
  }

  minusQty(item, key) {
    let cart = this.state.cart;
    let oldItem = cart.find((el) => el.id === item.id);

    oldItem.quantity = oldItem.quantity - 1;
    if (oldItem.quantity === 0) {
      cart.splice(key, 1);
    }
    sessionStorage.setItem("carts", JSON.stringify(cart));
    this.setState(() => ({ cart: cart }));
    this.countCart();
  }
  plusQty(item) {
    let cart = this.state.cart;
    let oldItem = cart.find((el) => el.id === item.id);

    oldItem.quantity = oldItem.quantity + 1;
    sessionStorage.setItem("carts", JSON.stringify(cart));
    this.setState(() => ({ cart: cart }));
    this.countCart();
  }

  getTotal() {
    let total = 0;
    let cart = JSON.parse(sessionStorage.getItem("carts"));
    if (!cart) {
      cart = [];
    }
    cart.forEach(
      (item) =>
        (total +=
          parseFloat(item.price) * parseFloat(item.quantity) -
          (parseFloat(item.price) *
            parseFloat(item.quantity) *
            this.state.perDis) /
            100)
    );
    sessionStorage.setItem("total", total);
    return total;
  }

  countCart() {
    let count = 0;
    this.state.cart.map(
      (item) => (count = parseInt(count) + parseInt(item.quantity))
    );
    sessionStorage.setItem("countCart", count);
  }

  async componentDidMount() {
    // get cart from session
    this.setState(() => ({
      cart: JSON.parse(sessionStorage.getItem("carts")),
    }));

    //get image
    let listFileImage = [];
    let listImage = [];

    this.state.cart.forEach((item) => {
      listImage.push(item.image);
    });

    for (let i = 0; i < listImage.length; i++) {
      let temp = await callAPI(`get_image/${listImage[i]}`, "GET", null).then(
        (res) => {
          return res.data.image;
        }
      );

      listFileImage.push(temp);
    }
    this.setState({
      imageProducts: listFileImage,
    });
  }

  render() {
    if (localStorage.getItem("currentAccount")) {
      if (this.state.cart) {
        return (
          <div>
            <Navbar />
            <div className="container mb-4">
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead className="text-center">
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col">Sản phẩm</th>
                          <th scope="col" className="text-center">
                            Số lượng
                          </th>
                          <th scope="col" className="text-right">
                            Giá
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.cart.map((item, key) => (
                          <tr key={key} className="text-center">
                            <td>
                              <img
                                src={this.state.imageProducts[key]}
                                height="70px"
                                width="70px"
                                alt="cart product"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className="row">
                              <button
                                onClick={() => this.minusQty(item, key)}
                                className="btn btn-danger"
                              >
                                -
                              </button>
                              <input
                                disabled
                                style={{ width: "80px" }}
                                className="form-control"
                                type="number"
                                value={item.quantity}
                              />
                              <button
                                onClick={() => this.plusQty(item)}
                                className="btn btn-danger"
                              >
                                +
                              </button>
                            </td>
                            <td className="text-right">
                              {(
                                parseFloat(item.price) *
                                  parseFloat(item.quantity) -
                                (parseFloat(item.price) *
                                  parseFloat(item.quantity) *
                                  this.state.perDis) /
                                  100
                              ).toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td className="text-right">
                              <button
                                onClick={this.removeCart(key)}
                                className="btn btn-sm btn-danger"
                              >
                                Remove
                              </button>
                            </td>
                            <td></td>
                          </tr>
                        ))}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <strong>Tổng</strong>
                          </td>
                          <td className="text-right">
                            <strong>
                              {this.getTotal().toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col mb-2">
                  <div className="row">
                    <div className="col-sm-12  col-md-6">
                      <Link className="btn btn-block btn-light" to="/">
                        Tiếp tục mua
                      </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 text-right">
                      <Link
                        className="btn btn-lg btn-block btn-success text-uppercase"
                        to="/check-out"
                      >
                        Đặt hàng
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar />
            <div className="container text-center">
              <h3>Bạn chưa có gì trong giỏ hàng cả!</h3>
              <Link className="btn btn-block btn-success" to="/">
                Tiếp tục mua
              </Link>
            </div>
          </div>
        );
      }
    } else {
      window.location.assign("/error");
    }
  }
}

export default Cart;
