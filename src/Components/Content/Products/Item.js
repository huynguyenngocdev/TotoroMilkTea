import React from "react";
import "./Item.css";

const Item = (props) => {
  return (
    <div className="col-lg-4 col-md-6 col-12 mt-3 pb-3">
      <div className="card product p-2" style={{ width: "auto" }}>
        <img
          className="card-img-top card-image"
          src={props.imageProduct}
          alt="product"
        />
        <div className="card-title product-title text-center h5">
          {props.product.name}
        </div>
        {/* show price */}
        {props.percentDiscount > 0 ? (
          <div className="text-center h6" style={{ color: "red" }}>
            {(
              parseFloat(props.product.price) -
              (parseFloat(props.product.price) * props.percentDiscount) / 100
            ).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
            &emsp;
            <del style={{ color: "gray" }}>
              {props.product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </del>
          </div>
        ) : (
          <div className="text-center h6" style={{ color: "red" }}>
            {props.product.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        )}

        <div className="star_box float-left pt-2">
          <button
            onClick={props.addCart}
            className="btn btn-sm btn-outline-primary float-right col-12"
          >
            <i className="fas fa-cart-plus" /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
