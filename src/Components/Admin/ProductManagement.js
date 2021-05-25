import React, { Component } from "react";
import $ from "jquery";
import callAPI from "../../API/callAPI";
class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileImageAdsInput = this.handleFileImageAdsInput.bind(this);
  }

  componentDidMount() {
    // callAPI("ads", "GET", null).then((res) => {
    //   this.setState({
    //     ads: res.data,
    //   });
    // });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updateAds();
  }

  updateAds = () => {
    // let data = {
    //   datetime: $("#datetimeAds").val(),
    //   image: $("#imageAds").val(),
    //   textStandstill: $("#textStandstillAds").val(),
    //   textRun: $("#textRunAds").val(),
    //   discount: $("#discountAds").val(),
    //   status: $("#statusAds").val(),
    // };
  };

  // preview image before upload
  handleFileImageAdsInput = () => {
    const preview = document.getElementById("newImageAds");
    const file = document.getElementById("imageAdsInput").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
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
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#updateAds"
          >
            <i className="fa fa-sync-alt fw" aria-hidden="true"></i> Cập nhật
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
                  <h5 className="modal-title">Cập nhật quảng cáo</h5>
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
                      <label htmlFor="datetimeAds">Hạn khuyến mãi:</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="datetimeAds"
                        min={new Date()
                          .toISOString()
                          .substring(
                            0,
                            ((new Date().toISOString().indexOf("T") | 0) + 6) |
                              0
                          )}
                        max="2030-12-31T00:00"
                        defaultValue={new Date()
                          .toISOString()
                          .substring(
                            0,
                            ((new Date().toISOString().indexOf("T") | 0) + 6) |
                              0
                          )}
                        required
                      />
                      <div className="invalid-feedback">
                        Không được để trống ô này.
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imageAds">Ảnh quảng cáo:</label>
                      <img
                        src={this.state.ads.image}
                        alt="Ảnh cũ"
                        id="oldImageAds" width={'100px'}
                      />
                      <br />
                      Hoặc :
                      <div className="input-group">
                        <input
                          type="file"
                          className="form-control"
                          id="imageAdsInput"
                          onChange={this.handleFileImageAdsInput}
                        />
                      </div>
                      <img src alt="Ảnh mới" id="newImageAds" width={'100px'}/>
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="textStandstillAds"
                        defaultValue={
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
                        defaultValue={
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
                        defaultValue={
                          this.state.ads != null
                            ? this.state.ads.discount
                            : null
                        }
                        max={50}
                        min={0}
                        required
                      />
                      <div className="invalid-feedback">
                        Không được để trống ô này.
                      </div>
                    </div>

                    <div class="form-group">
                      <label htmlFor="statusAds">Trạng thái quảng cáo:</label>
                      <select
                        className="form-control"
                        id="statusAds"
                        defaultValue={
                          this.state.ads != null ? this.state.ads.status : null
                        }
                      >
                        <option value={true}>Đang bật</option>
                        <option value={false}>Đang tắt</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger btn-rounded"
                    >
                      <i className="fa fa-sync-alt fw" aria-hidden="true"></i>
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
    } else {
      return <div></div>;
    }
  }
}

export default ProductManagement;
