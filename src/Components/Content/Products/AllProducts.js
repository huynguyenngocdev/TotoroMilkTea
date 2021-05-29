import callAPI from "API/callAPI";
import React, { Component } from "react";
import "./Products.css";
import "./Item.css";
import Item from "./Item";
import Cart from "../Products/Cart"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";



class Products extends Component {
  
  constructor() {
    super();
    this.addProductToCart = this.addProductToCart.bind(this);
    this.createBill = this.createBill.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
    this.onEditProduct = this.onEditProduct.bind(this);
    this.setValue = this.setValue.bind(this);
    this.toggleNext = this.toggleNext.bind(this);
    this.togglePrev = this.togglePrev.bind(this);
    this.setCountCart = this.setCountCart.bind(this);
    // var product = JSON.parse(localStorage.getItem("products"));

    var bills = JSON.parse(localStorage.getItem("bills"));
    if (!bills) {
      bills = [];
    }
    var cart = JSON.parse(localStorage.getItem("carts"));
    if (!cart) {
      cart = [];
    }
    this.state = {
      products: [],
      imageProducts: [],
      bill: bills,
      searchItem: [],
      formValue: [],
      isEdit: false,
      countCartItem: cart.length,
      indexStart: 0,
      indexEnd: 4,
      disabledNext: false,
      disabledPrev: true,
      redirect: false,
    };
  }
   //----------PAGINATION---------//

   togglePrev(e) {
    var indexStart = this.state.indexStart - 4;
    var indexEnd = this.state.indexEnd - 4;
    var disabledPrev = false;

    if (indexStart <= 0) {
      e.preventDefault();
      indexStart = 0;
      indexEnd = 4;
      disabledPrev = true;
    }

    this.setState({
      indexStart: indexStart,
      indexEnd: indexEnd,
      disabledPrev: disabledPrev,
      disabledNext: false,
    });
  }

  toggleNext(e) {
    var indexStart = this.state.indexStart + 4;
    var indexEnd = this.state.indexEnd + 4;
    var disabledNext = false;
    if (indexEnd >= this.state.products.length) {
      e.preventDefault();
      disabledNext = true;
    } else if (
      this.state.searchItem &&
      indexEnd > this.state.searchItem.length
    ) {
      e.preventDefault();
      disabledNext = true;
    }
    this.setState({
      indexStart: indexStart,
      indexEnd: indexEnd,
      disabledNext: disabledNext,
      disabledPrev: false,
    });
  }

  //----------SHOPPING CART---------//

  addProductToCart(item) {
    return (event) => {
      var cart = JSON.parse(localStorage.getItem("carts"));
      if (!cart) {
        cart = [];
      }
      var oldItem = cart.find((el) => el.id === item.id);
      if (oldItem) {
        oldItem.quantity += 1;
      } else {
        item.quantity = 1;
        cart.push(item);
      }
      this.setState({ countCartItem: cart.length });
      localStorage.setItem("carts", JSON.stringify(cart));
    };
  }

  setCountCart() {
    var cart = JSON.parse(localStorage.getItem("carts"));
    this.setState({
      countCartItem: cart.length,
    });
  }

  getTotal() {
    var total = 0;
    var cart = JSON.parse(localStorage.getItem("carts"));
    if (!cart) {
      cart = [];
    }
    cart.map(
      (item) => (total += parseInt(item.price) * parseInt(item.quantity))
    );
    return total;
  }

  //----------DETAIL PRODUCT---------//

  showDetailProduct(item) {
    return (event) => {
      this.setState({
        detail: item,
      });
    };
  }

  //----------BILL PRODUCT---------//
  createBill(event) {
    event.preventDefault();
    var billname = event.target["bill-name"].value;
    var billphone = event.target["bill-phone"].value;
    var billadress = event.target["bill-address"].value;
    var billemail = event.target["bill-email"].value;
    var bill = {
      billname: billname,
      billphone: billphone,
      billadress: billadress,
      billemail: billemail,
      products: localStorage.getItem("carts"),
      billtotal: this.getTotal(),
      billdate: new Date().toLocaleString(),
    };
    var bills = JSON.parse(localStorage.getItem("bills"));
    if (!bills) {
      bills = [];
    }
    bills.push(bill);
    localStorage.setItem("bills", JSON.stringify(bills));
    alert("Thanh toán thành công!");
    localStorage.removeItem("carts");
    this.setState({ bill: bills, countCartItem: 0, redirect: true });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  //----------SEARCH PRODUCT---------//

  searchProduct(event) {
    event.preventDefault();
    var products = this.state.products;
    var txt_search = event.target["txt-search"].value;
    const result = products.filter((product) => {
      return (
        product.name.toLowerCase().indexOf(txt_search.toLowerCase()) !== -1 ||
        product.category.toLowerCase().indexOf(txt_search.toLowerCase()) !== -1
      );
    });
    console.log(result.length);
    if (result.length == 0) {
      alert("Not found");
    } else {
      this.setState({
        searchItem: result,
        indexStart: 0,
        indexEnd: 4,
        disabledPrev: true,
      });
    }
  }

  //----------SORT PRODUCT---------//
  sortByPriceAsc = () => {
    var sortedProductsAsc;
    sortedProductsAsc = this.state.products.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });

    this.setState({
      products: sortedProductsAsc,
    });
  };
  sortByPriceDsc = () => {
    var sortedProductsDsc;
    sortedProductsDsc = this.state.products.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });

    this.setState({
      products: sortedProductsDsc,
    });
  };

  //----------CRUD PRODUCT---------//

  onAddProduct(event) {
    event.preventDefault();
    var name = event.target["name"].value;
    var price = event.target["price"].value;
    var image = event.target["image"].value;
    var category = event.target["category"].value;
    //  var imageFile = event.target['imageFile'].files;
    // alert(imageFile);
    var products = JSON.parse(localStorage.getItem("products"));
    if (!products) {
      products = [];
    }
    var product = {
      id: products.length + 1,
      name: name,
      price: price,
      image: image,
      category: category,
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({
      products: products,
    });
  }

  onUpdateProduct(event) {
    event.preventDefault();
    var id = event.target["id"].value;
    var name = event.target["name"].value;
    var price = event.target["price"].value;
    var image = event.target["image"].value;
    var category = event.target["category"].value;
    var products = JSON.parse(localStorage.getItem("products"));
    var oldItem = products.find((el) => el.id == id);
    oldItem.name = name;
    oldItem.price = price;
    oldItem.image = image;
    oldItem.category = category;
    localStorage.setItem("products", JSON.stringify(products));
    this.setState({ products: products });
  }
  onRemoveProduct(key) {
    return (event) => {
      var newArr = JSON.parse(localStorage.getItem("products"));
      newArr.splice(key, 1);
      localStorage.setItem("products", JSON.stringify(newArr));
      this.setState({ products: newArr });
    };
  }
  setValue(e) {
    this.setState({ formValue: e.target.value });
  }
  onEditProduct(item) {
    return (event) => {
      this.setState({
        isEdit: true,
        formValue: item,
      });
    };
  }

  async componentDidMount() {
    await callAPI("products", "GET", null).then((res) => {
      this.setState(() => ({
        products: res.data,
      }));
    });

    let listImage = [];
    let listFileImage = [];
    //get image products
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
    this.setState({ imageProducts: listFileImage });
  }


  
  render() {
    console.log(this.state.products);
    if (this.state.products) {
      return (
        <div className="container">
          <p className="title_products">
            <span>Trà sữa</span>
          </p>
          <button
                  className="btn-icon"
                  onClick={this.togglePrev}
                  disabled={this.state.disabledPrev}
                >
                  <FontAwesomeIcon
                    className="iconCirleLeft"
                    icon={faChevronCircleLeft}
                  />
                </button>
                <button
                  className="btn-icon"
                  onClick={this.toggleNext}
                  disabled={this.state.disabledNext}
                >
                  <FontAwesomeIcon
                    className="iconCirleRight"
                    icon={faChevronCircleRight}
                  />
                </button>
          <div className="container row">
            {this.state.products.map((product,index) => {
              return <Item key={index} product={product} addCart={this.addCart(index)} />;
            })}
          </div>

          <p className="title_products">
            <span>Nước ép</span>
          </p>
          {/* <section className="row"></section> */}
          <div className="container row">
            {this.state.products.map((product,index) => {
              return <Item key={index} product={product} />;
            })}
            </div>

            <p className="title_products">
            <span>Sinh tố</span>
          </p>
          {/* <section className="row"></section> */}
          <div className="container row">
            {this.state.products.map((product,index) => {
              return <Item key={index} product={product} />;
            })}
            </div>


            <p className="title_products">
            <span>Cà phê</span>
          </p>
          {/* <section className="row"></section> */}
          <div className="container row">
            {this.state.products.map((product,index) => {
              return <Item key={index} product={product} />;
            })}
            </div>
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
