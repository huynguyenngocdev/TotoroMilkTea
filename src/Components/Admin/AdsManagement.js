import React, { Component } from "react";

import $ from "jquery";
class AdsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // axios({
    //   method: "GET",
    //   url: URL + "ads",
    //   data: null,
    // })
    //   .then((res) => {
    //     this.setState({
    //       ads: res.data,
    //     });
    //   })
    //   .catch((err) => {});
    // function dateChange(){
    //   document.getElementById('a').innerHTML = new Date(document.getElementById('birthdaytime').value).toDateString()
    //   }
    //   window.addEventListener('load', () => {
    //     const now = new Date();
    //     //document.getElementById('a').innerHTML = now.toGMTString()
    //      document.getElementById('birthdaytime').value = (now.toISOString()).substring(0, ((now.toISOString()).indexOf("T")|0) + 6|0);
    //   });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updateAds();
  }

  updateAds = () => {
    let data = {
      datetime: $("#datetimeAds").val(),
      image: $("#imageAds").val(),
      textStandstill: $("#textStandstillAds").val(),
      textRun: $("#textRunAds").val(),
      discount: $("#discountAds").val(),
      status: $("#statusAds").val(),
    };
    // axios({
    //   method: "PUT",
    //   url: URL + "ads",
    //   data: data,
    // }).then((res) => {
    //   alert("Update success");
    // });
  };

  handleFileInput = (e) => {
    const file = e.target.files[0];
  };

  render() {
    console.log(this.state.ads);
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#updateAds"
        >
          Cập nhật
        </button>
        <div
          className="modal fade"
          id="updateAds"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">Đóng</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="was-validated" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="datetimeAds"
                      min={
                        new Date().getFullYear() +
                        "-" +
                        (new Date().getMonth() + 1) +
                        "-" +
                        new Date().getDate() +
                        "T00:00"
                      }
                      max="2030-12-31T00:00"
                      required
                    />
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        name="imageAds"
                        id="imageAds"
                        onChange={this.handleFileInput}
                        required
                      />
                      <div className="invalid-feedback">
                        Không được để trống ô này.
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="textStandstillAds"
                      value={
                        this.state.ads != null
                          ? this.state.ads.textStandstill
                          : ""
                      }
                      required
                    />
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="textRunAds"
                      value={
                        this.state.ads != null ? this.state.ads.textRun : ""
                      }
                      required
                    />
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      id="discountAds"
                      value={
                        this.state.ads != null ? this.state.ads.discount : 0
                      }
                      max={50}
                      min={0}
                      required
                    />
                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="checkbox"
                      className="form-control"
                      id="statusAds"
                      onChange={() => {
                        $("#statusAds").is(":checked") == true
                          ? $("#status").html("Đang bật")
                          : $("#status").html("Đang tắt");
                      }}
                    />

                    <span id="status">...</span>

                    <div className="invalid-feedback">
                      Không được để trống ô này.
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger btn-rounded">
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <table className="table text-center">
          <thead>
            <tr>
              <th>Thời gian kết thúc khuyến mãi</th>
              <th>Ảnh quảng cáo</th>
              <th>Chữ ở banner(đứng yên)</th>
              <th>Chữ chạy liên tục</th>
              <th>Giảm giá(%)</th>
              <th>Trạng thái quảng cáo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ads != null ? (
              <tr>
                <td>{this.state.ads.datetime}</td>
                <td>
                  <img src={this.state.ads.image} width={"50px"} />
                </td>
                <td>{this.state.ads.textStandstill}</td>
                <td>{this.state.ads.textRun}</td>
                <td>{this.state.ads.discount}</td>
                <td>
                  {this.state.ads.status == true ? "Đang bật" : "Đang tắt"}
                </td>
              </tr>
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

AdsManagement.propTypes = {};

export default AdsManagement;
