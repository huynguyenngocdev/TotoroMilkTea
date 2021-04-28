import React from "react";
import "./Item.css";
import Detail from "./Detail";

const Details = (detail) => {
  <Detail Photos={detail} />;
};

const Item = (props) => {
  return (
    <div className="col-md-3">
      <div>
        <div className="card-img-top zoom">
          <img
            className="img-fluid w-100"
            src={props.Photos.photo}
            alt="product"
          />
        </div>
        <div className="card-body">
          <div className="card-title font-weight-bold indigo-text"></div>
          <b>{props.Photos.title}</b>
          <div>
            <button
              className="float-left btn btn-rounded btn-info waves-effect"
              onClick={Details(props.Photos)}
              data-toggle="modal"
              data-target="#detail"
            >
              <i className="fa fa-info" aria-hidden="true" />
            </button>
              <button
                type="submit"
                className="float-right btn btn-warning waves-effect"
              >
                <i className="fas fa-cart-plus" />
                <b>Thêm vào giỏ</b>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
