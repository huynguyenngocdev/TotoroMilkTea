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
      productIsUpdating: -1,
    };
    this.addNewProduct = this.addNewProduct.bind(this);
    this.previewNewProductImage = this.previewNewProductImage.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
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
        alert("Th??m s???n ph???m th??nh c??ng!");
      })
      .catch((err) => alert("Th??m s???n ph???m kh??ng th??nh c??ng."));

    $("#btnCloseProductModal").click();

    this.componentDidMount();
  }

  async deleteProduct(index) {
    let check = window.confirm("B???n c?? ch???c l?? mu???n x??a s???n ph???m n??y kh??ng");
    if (check) {
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
          alert("X??a s???n ph???m th??nh c??ng!");
        } else {
          alert("X??a s???n ph???m kh??ng th??nh c??ng.");
        }
      });

      this.componentDidMount();
    }
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
        this.setState(() => ({ imageProductsTemp: reader.result }));
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  openModalUpdate(index) {
    $("#productId").val(this.state.products[index].id);

    $("#productName").val(this.state.products[index].name);

    $("#imageProduct").attr("src", this.state.imageProducts[index]);

    $("#productPrice").val(this.state.products[index].price);
    $("#productCategoryId").val(this.state.products[index].categoryId);
    this.setState({ productIsUpdating: this.state.products[index].id });
  }

  async updateProduct(e) {
    e.preventDefault();
    //let imageUpdate = $("#imageProduct").attr("src");
   // console.log(this.state.productIsUpdating);
    let updatingProduct = {
      id: this.state.productIsUpdating,
      name: $("#productName").val(),
      price: parseInt($("#productPrice").val()),
      categoryId: parseInt($("#productCategoryId").val()),
      image: $("#imageProduct").attr("src"),
      updateAt: this.state.products[this.state.productIsUpdating - 1].updateAt,
      amountSold: this.state.products[this.state.productIsUpdating - 1].amountSold,
    };

    //console.log(updatingProduct);

    await callAPI(`products/${this.state.productIsUpdating}`, "PUT", updatingProduct)
      .then(() => {
        alert("C???p nh???t s???n ph???m th??nh c??ng!");
      })
      .catch((err) => alert("C???p nh???t s???n ph???m kh??ng th??nh c??ng."));

    $("#btnCloseProductModal").click();

    this.componentDidMount();
  }

  render() {
    //console.log(this.state.productIsUpdating);
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            $("#productId").val("");

            $("#productName").val("");

            $("#imageProduct").attr("src", "");

            $("#productPrice").val("");

            this.setState(() => ({ purposeModal: "add" }));
          }}
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#productModal"
        >
          <i className="fas fa-plus fw" aria-hidden="true"></i> Th??m s???n ph???m
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
                <h5 className="modal-title">Th??m/C???p nh???t s???n ph???m</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id="btnCloseProductModal"
                >
                  <span aria-hidden="true">????ng</span>
                </button>
              </div>

              <div className="modal-body">
                <form className="was-validated" encType="multipart/form-data">
                  {/* id product (only show when update) */}
                  {this.state.purposeModal === "update" ? (
                    <div className="form-group">
                      <label htmlFor="productId" className="col-form-label">
                        ID c???a s???n ph???m
                      </label>

                      <input
                        type="text"
                        className="form-control-plaintext"
                        id="productId"
                        readOnly
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {/* product name */}
                  <div className="form-group">
                    <label htmlFor="productName" className="col-form-label">
                      T??n s???n ph???m
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="Nh???p t??n s???n ph???m..."
                      required
                    />

                    <div className="invalid-feedback">
                      Kh??ng ???????c ????? tr???ng ?? n??y.
                    </div>
                  </div>
                  {/* product image */}
                  <div className="form-group">
                    <label
                      htmlFor="imageProductInput"
                      className="col-form-label"
                    >
                      ???nh s???n ph???m
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
                      Gi?? g???c
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="productPrice"
                      placeholder="Nh???p gi?? s???n ph???m..."
                      min={0}
                      required
                    />
                    <div className="invalid-feedback">
                      Kh??ng ???????c ????? tr???ng ?? n??y.
                    </div>
                  </div>
                  {/* product category */}
                  <div className="form-group">
                    <label htmlFor="productCategoryId">Danh m???c s???n ph???m</label>
                    <select className="form-control" id="productCategoryId">
                      {this.state.categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.id}. {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* button */}
                  {this.state.purposeModal === "add" ? (
                    <button
                      type="button"
                      onClick={this.addNewProduct}
                      className="btn btn-danger btn-rounded"
                    >
                      <i className="fa fa-plus fw" aria-hidden="true"></i> Th??m
                      m???i
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={this.updateProduct}
                      className="btn btn-danger btn-rounded"
                    >
                      <i className="fas fa-sync-alt fw" aria-hidden="true"></i>{" "}
                      C???p nh???t
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* show list products */}
        <table className="table text-center table-hover">
          <thead>
            <tr>
              <th>ID s???n ph???m</th>
              <th>T??n s???n ph???m</th>
              <th>H??nh ???nh</th>
              <th>Gi?? g???c</th>
              <th>Gi?? khuy???n m??i({this.state.percentDiscount}%)</th>
              <th>Danh m???c s???n ph???m</th>
              <th>???? b??n (ly)</th>
              <th>H??nh ?????ng</th>
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
                    onClickCapture={() => {
                      this.setState(() => ({ purposeModal: "update" }));
                    }}
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
