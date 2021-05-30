import React, { Component } from "react";
import Item from "./Products/Item";
import callAPI from "../../API/callAPI";
class SearchContent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  //----------SHOPPING CART---------//

  addProductToCart(item) {
    if (localStorage.getItem("currentAccount")) {
      let cart = JSON.parse(sessionStorage.getItem("carts"));
      if (!cart) {
        cart = [];
      }
      const oldItem = cart.find((el) => el.id === item.id);
      if (oldItem) {
        oldItem.quantity += 1;
      } else {
        item.quantity = 1;
        cart.push(item);
      }
      //set cart
      sessionStorage.setItem("carts", JSON.stringify(cart));
      //set count cart
      let count = 0;
      cart.map((item) => (count = parseInt(count) + parseInt(item.quantity)));
      sessionStorage.setItem("countCart", count);
      window.location.reload();
    } else {
      alert("Bạn phải đăng nhập để sử dụng chức năng này!");
    }
  }

  async componentDidMount() {
    let searchValue = localStorage.getItem("searchProduct");
    await callAPI(`products?q=${searchValue}`, "GET", null).then((res) =>
      this.setState(() => ({
        searchValue: searchValue,
        products: res.data,
      }))
    );
    //get image products
    if (this.state.products.length > 0) {
      let listImage = [];
      let listFileImage = [];

      this.state.products.forEach((product) => {
        listImage.push(product.image);
      });

      for (let i = 0; i < listImage.length; i++) {
        let temp = await callAPI(`get_image/${listImage[i]}`, "GET", null).then(
          (res) => {
            return res.data.image;
          }
        );
        listFileImage.push(temp);
      }
      await this.setState(() => ({ imageProducts: listFileImage }));
    }
  }

  render() {
    if (
      this.state.products &&
      this.state.products.length > 0 &&
      this.state.imageProducts
    ) {
      return (
        <div className="container">
          <div id="products" className="row">
            {this.state.products.map((product, index) => (
              <Item
                key={index}
                imageProduct={this.state.imageProducts[index]}
                product={product}
                addCart={() => this.addProductToCart(product)}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div id="products">
          <h2 className="text-center">
            Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa
            {this.state.searchValue}
          </h2>
          <div className="text-center">
            <h3>Để tìm được kết quả chính xác hơn, bạn vui lòng:</h3>
            <ul>
              <li>Kiểm tra lỗi chính tả của từ khóa đã nhập</li>
              <li>Thử lại bằng từ khóa khác</li>
              <li>Thử lại bằng những từ khóa tổng quát hơn</li>
              <li>Thử lại bằng những từ khóa ngắn gọn hơn</li>
            </ul>
          </div>
        </div>
      );
    }
  }
}
export default SearchContent;
