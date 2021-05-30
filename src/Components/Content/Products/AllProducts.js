import callAPI from "API/callAPI";
import React, { Component } from "react";
import "./Products.css";
import "./Item.css";
import Item from "./Item";

class Products extends Component {
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);

    var bills = JSON.parse(sessionStorage.getItem("bills"));
    if (!bills) {
      bills = [];
    }

    var cart = JSON.parse(sessionStorage.getItem("carts"));
    if (!cart) {
      cart = [];
    }

    this.state = {
      products: [],
      imageProducts: [],
      percentDiscount: 0,
      bill: bills,
    };
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

  //----------GET ALL PRODUCT---------//
  async componentDidMount() {
    // get list product
    await callAPI("products", "GET", null).then((res) => {
      this.setState(() => ({
        products: res.data,
      }));
    });
    //get categories of product
    await callAPI("categories", "GET", null).then((res) => {
      this.setState(() => ({
        categories: res.data,
      }));
    });
    //get image products
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
    this.setState(() => ({ imageProducts: listFileImage }));
    //get ads (percent discount)
    await callAPI("ads", "GET", null).then((res) => {
      let timeDiscount = new Date(res.data.datetime).getTime();
      let now = new Date().getTime();

      if (timeDiscount - now > 0 && res.data.status === true) {
        this.setState(() => ({
          percentDiscount: parseFloat(res.data.discount),
        }));
      } else {
        this.setState(() => ({
          percentDiscount: 0,
        }));
      }
      sessionStorage.setItem(
        "percentDiscount",
        parseFloat(this.state.percentDiscount)
      );
    });
  }

  render() {
    if (
      this.state.products &&
      this.state.categories &&
      this.state.imageProducts
    ) {
      return (
        <div className="container">
          {this.state.categories.map((category, indexC) => (
            <div key={indexC}>
              <p className="title_products">
                <span>{category.categoryName}</span>
              </p>

              <div className="container row">
                {this.state.products.slice().map((product, indexP) => {
                  if (category.id === product.categoryId) {
                    return (
                      <Item
                        key={indexP}
                        imageProduct={this.state.imageProducts[indexP]}
                        product={product}
                        percentDiscount={this.state.percentDiscount}
                        addCart={() => this.addProductToCart(product)}
                      />
                    );
                  } else return "";
                })}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }
}

export default Products;
