import React, { Component } from "react";
import $ from "jquery";
import callAPI from "../../API/callAPI";

class AdsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: null,
      imageAds: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileImageAdsInput = this.handleFileImageAdsInput.bind(this);
  }

  componentDidMount() {
    callAPI("ads", "GET", null).then((res) => {
      this.setState({
        ads: res.data,
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let imageAds = this.state.ads.image;
    if (
      this.state.imageAds !== undefined &&
      this.state.imageAds !== null
    ) {
      imageAds = this.state.imageAds;
    }
    
    let data = {
      datetime: $("#datetimeAds").val(),
      image: imageAds,
      textStandstill: $("#textStandstillAds").val(),
      textRun: $("#textRunAds").val(),
      discount: $("#discountAds").val(),
      status:  Boolean($("#statusAds").val()),
      updateAt:  this.state.ads.updateAt
    };

    callAPI('ads','PUT',data).then((res) => {
      //console.log(res);
      alert("Cập nhật quảng cáo thành công")
    });
  }

  // preview image before upload
  handleFileImageAdsInput = () => {
    const preview = document.getElementById("newImageAds");
    const file = document.getElementById("imageAdsInput").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
        this.setState({ imageAds: reader.result });
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
    if (this.state.ads != null) {
      return (
        <div className="container" style={{ marginTop: "15px" }}>
          <form
            encType="multipart/form-data"
            className="was-validated"
            onSubmit={this.handleSubmit}
          >
            {/* datetime */}
            <div className="form-group row">
              <label htmlFor="datetimeAds" className="col-sm-2 col-form-label">
                Hạn khuyến mãi:
              </label>
              <input
                type="datetime-local"
                className="form-control col-sm-5"
                id="datetimeAds"
                min={new Date()
                  .toISOString()
                  .substring(
                    0,
                    ((new Date().toISOString().indexOf("T") | 0) + 6) | 0
                  )}
                max="2030-12-31T00:00"
                defaultValue={this.state.ads.datetime}
                required
              />
              <div className="invalid-feedback">Không được để trống ô này.</div>
            </div>
            {/* image */}
            <div className="form-group row">
              <label htmlFor="imageAds" className="col-sm-2 col-form-label">
                Ảnh quảng cáo:
              </label>

              <div className="input-group col-sm-10">
                <img
                  src={this.state.ads.image}
                  alt="Ảnh cũ"
                  id="oldImageAds"
                  width={"100px"}
                />
                HOẶC:&nbsp;&nbsp;
                <input
                  type="file"
                  id="imageAdsInput"
                  onChange={this.handleFileImageAdsInput}
                />
                <img
                  src={this.state.imageAds}
                  alt="Ảnh mới"
                  id="newImageAds"
                  width={"100px"}
                />
              </div>
            </div>
            {/* text standstill */}
            <div className="form-group row">
              <label
                htmlFor="textStandstillAds"
                className="col-sm-2 col-form-label"
              >
                Phần chữ đứng yên
              </label>
              <textarea
                className="form-control col-sm-10"
                id="textStandstillAds"
                rows="3"
                defaultValue={this.state.ads.textStandstill}
                required
              ></textarea>

              <div className="invalid-feedback col-sm-4">
                <i
                  className="fa fa-exclamation-triangle"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="invalid-feedback col-sm-8">
                Không được để trống ô này.
              </div>
            </div>
            {/* text run */}
            <div className="form-group row">
              <label htmlFor="textRunAds" className="col-sm-2 col-form-label">
                Phần chữ chuyển động
              </label>
              <textarea
                className="form-control col-sm-10"
                id="textRunAds"
                rows="3"
                defaultValue={this.state.ads.textRun}
                required
              />

              <div className="invalid-feedback col-sm-4">
                <i
                  className="fa fa-exclamation-triangle"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="invalid-feedback col-sm-8">
                Không được để trống ô này.
              </div>
            </div>
            {/* discount */}
            <div className="form-group row">
              <label htmlFor="discountAds" className="col-sm-2 col-form-label">
                Giảm giá(%)
              </label>
              <input
                type="number"
                className="form-control col-sm-2"
                id="discountAds"
                defaultValue={this.state.ads.discount}
                max={50}
                min={0}
                required
              />
              <div className="invalid-feedback col-sm-8">
                <i
                  className="fa fa-exclamation-triangle"
                  aria-hidden="true"
                ></i>
                Không được để trống ô này.
              </div>
            </div>
            {/* status ads */}
            <div className="form-group row">
              <label htmlFor="statusAds" className="col-sm-2 col-form-label">
                Trạng thái quảng cáo:
              </label>
              <select
                className="form-control col-sm-4"
                id="statusAds"
                defaultValue={this.state.ads.status}
              >
                <option value={true}>Đang bật</option>
                <option value={false}>Đang tắt</option>
              </select>
            </div>
            {/* btn submit */}
            <div className="text-center">
              <button type="submit" className="btn btn-danger btn-rounded">
                <i className="fa fa-sync-alt fw" aria-hidden="true"></i>
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default AdsManagement;
