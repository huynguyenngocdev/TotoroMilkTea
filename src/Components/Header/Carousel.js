import React from "react";
import './Header.css'
import Images from 'Constants/images'
class Carousel extends React.PureComponent {
  render() {
    return (
      <div className="slide_bg1">
        <div
          id="carouselId"
          className="carousel slide slide_bg2 col-lg-6 col-md-8 col-sm-12"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselId"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselId" data-slide-to="1"></li>
            <li data-target="#carouselId" data-slide-to="2"></li>
            <li data-target="#carouselId" data-slide-to="3"></li>
            <li data-target="#carouselId" data-slide-to="4"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item text-center active">
              <img
                src={Images.sldZero}
                alt="Zero slide"
                className="img-slider"
              />
            </div>
            <div className="carousel-item text-center">
              <img
                src={Images.sldOne}
                alt="First slide"
                className="img-slider"
              />
            </div>
            <div className="carousel-item text-center">
              <img
                src={Images.sldTwo}
                alt="Second slide"
                className="img-slider"
              />
            </div>
            <div className="carousel-item text-center">
              <img
                src={Images.sldThree}
                alt="Third slide"
                className="img-slider"
              />
            </div>
            <div className="carousel-item text-center">
              <img
                src={Images.sldFour}
                alt="Third slide"
                className="img-slider"
              />
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselId"
            role="button"
            data-slide="prev"
            style={{ color: "black" }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={{ color: "black" }}
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselId"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
          <button type="button" className="btnToOrder">
            Đặt hàng ngay
          </button>
      </div>
    );
  }
}
export default Carousel;
