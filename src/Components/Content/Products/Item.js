import React from "react";
// import {actFetchProductsRequest,AddCart} from '../action'
// import {connect} from 'react-redux';

import "./Item.css";
import addCart from "../Products/Cart"



const Item = (props) => {

  
  return (
    <div className="col-lg-4 col-md-6 col-6 mt-3 pb-3">
      <div className="card product p-2" style={{ width: "auto" }}>
        <img
          htmlFor="imageAds"
          className="card-img-top"
          src={props.product.image}
        />
        <div className="card-title product-title text-center h5">
          {props.product.name}
        </div>
        <div className="text-center h6">{props.product.price}VNĐ</div>
        <div className="star_box float-left pt-2">
          <button onClick={addCart} className="btn btn-sm btn-outline-primary float-right col-12" >
            <i className="fas fa-cart-plus" /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};




export default Item;
