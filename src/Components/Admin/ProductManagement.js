import React, { Component } from "react";
import $ from "jquery";
import callAPI from "../../API/callAPI";
class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      imageProducts: [],
      categories: [],
      percentDiscount: 0,
      imageProductsTemp: "",
      purposeModal: "add",
    };
    this.addNewProduct = this.addNewProduct.bind(this);
    this.previewNewProductImage = this.previewNewProductImage.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async componentDidMount() {
    // get all products
    await callAPI("products", "GET", null).then((res) => {
      this.setState(() => ({
        products: res.data,
      }));
    });
    // get all categories
    await callAPI("categories", "GET", null).then((res) => {
      this.setState(() => ({
        categories: res.data,
      }));
    });
    // get percent discount
    await callAPI("ads", "GET", null).then((res) => {
      this.setState(() => ({
        percentDiscount: res.data.discount,
      }));
    });
    this.getImageProducts();
  }

  async getImageProducts() {
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

  async addNewProduct(e) {
    e.preventDefault();
    let newProduct = {
      name: $("#productName").val(),
      price: parseInt($("#productPrice").val()),
      categoryId: parseInt($("#productCategoryId").val()),
      image: this.state.imageProductsTemp,
      amountSold: 3000,
    };

    await callAPI("products", "POST", newProduct)
      .then((res) => {
        alert("Thêm sản phẩm thành công!");
      })
      .catch((err) => alert("Thêm sản phẩm không thành công."));

    $("#btnCloseProductModal").click();

    this.componentDidMount();
  }

  async deleteProduct(index) {
    await callAPI(
      `delete_image/${this.state.products[index].image}`,
      "POST",
      null
    );

    await callAPI(
      `products/${this.state.products[index].id}`,
      "DELETE",
      null
    ).then((res) => {
      if (res.status === 200) {
        alert("Xóa sản phẩm thành công!");
      } else {
        alert("Xóa sản phẩm không thành công.");
      }
    });

    this.componentDidMount();
  }

  previewNewProductImage = () => {
    const preview = document.getElementById("imageProduct");
    const file = document.getElementById("imageProductInput").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
        this.setState({ imageProductsTemp: reader.result });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  openModalUpdate(index) {
    $("#productName").val(this.state.products[index].name);

    $("#imageProduct").attr("src", this.state.imageProducts[index]);

    $("#productPrice").val(this.state.products[index].price);
    $("#productCategoryId").val(this.state.products[index].categoryId);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={()=>{this.setState(()=>({purposeModal: 'add'}))}}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#productModal"
        >
          <i className="fas fa-plus fw" aria-hidden="true"></i> Thêm sản phẩm
        </button>

        <div
          className="modal fade"
          id="productModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm/Cập nhật sản phẩm</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="btnCloseProductModal"
                >
                  <span aria-hidden="true">Đóng</span>
                </button>
              </div>

              <div className="modal-body">
                <form
                  className="was-validated"
                  onSubmit={this.addNewProduct}
                  encType="multipart/form-data"
                >
                  {/* product name */}
                  <div className="form-group">
                    <label htmlFor="productName" className="col-form-label">
                      Tên sản phẩm
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="Nhập tên sản phẩm..."
                      required
                    />

                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>
                  {/* product image */}
                  <div className="form-group">
                    <label
                      htmlFor="imageProductInput"
                      className="col-form-label"
                    >
                      Ảnh sản phẩm
                    </label>

                    <div className="input-group">
                      <input
                        type="file"
                        id="imageProductInput"
                        onChange={this.previewNewProductImage}
                      />
                      <img
                        src=""
                        alt="image_product"
                        id="imageProduct"
                        width={"100px"}
                      />
                    </div>
                  </div>
                  {/* product price */}
                  <div className="form-group">
                    <label htmlFor="productPrice" className="col-form-label">
                      Giá gốc
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      placeholder="Nhập giá sản phẩm..."
                      min={0}
                      required
                    />
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>
                  {/* product category */}
                  <div className="form-group">
                    <label htmlFor="productCategoryId">Danh mục sản phẩm</label>
                    <select className="form-control" id="productCategoryId">
                      {this.state.categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.id}. {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {this.state.purposeModal === "add" ? (
                    <button
                      type="submit"
                      className="btn btn-danger btn-rounded"
                    >
                      <i className="fa fa-plus fw" aria-hidden="true"></i> Thêm mới
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-danger btn-rounded"
                    >
                      <i className="fas fa-sync-alt fw" aria-hidden="true"></i> Cập nhật
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* show list products */}
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá gốc</th>
              <th>Giá khuyến mãi({this.state.percentDiscount}%)</th>
              <th>Danh mục sản phẩm</th>
              <th>Đã bán (ly)</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <img
                    src={this.state.imageProducts[index]}
                    width="50px"
                    alt="image_product"
                  />
                </td>
                <td>
                  {product.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>
                  {(
                    product.price -
                    (product.price * this.state.percentDiscount) / 100
                  ).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>
                  {this.state.categories[product.categoryId - 1]
                    ? this.state.categories[product.categoryId - 1].categoryName
                    : ""}
                </td>
                <td>{product.amountSold}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    data-toggle="modal"
                    data-target="#productModal"
                    onClick={() => this.openModalUpdate(index)}
                    onClickCapture={()=>{this.setState(()=>({purposeModal: 'update'}))}}
                  >
                    <i className="fas fa-edit fw" />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.deleteProduct(index)}
                  >
                    <i className="far fa-trash-alt fw" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductManagement;
