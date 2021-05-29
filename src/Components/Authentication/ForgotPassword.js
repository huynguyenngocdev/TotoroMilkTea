import React, { Component } from 'react';
import $ from "jquery";
import callAPI from "../../API/callAPI";
import SendEmail from "../../Features/SendEmail";
class ForgotPassword extends Component {
   
    checkEmail=(e)=>{
        e.preventDefault();
        let email=$("#email").val();
       let endpoint=`/users?email=${email}`
     console.log(email);
        callAPI(endpoint, "GET", null)
        .then((res) => {
          let check = res.data;
          if (check.length === 0) {
            console.log(check);
            $("#incorrect-email").css("color", "red").html("Error: Email này chưa đăng ký!");
          } else {
              let u=check[0].username;
              let p=check[0].password;
            $("#incorrect-email").css("color", "#20c997").html("Notice: Email chính xác! ");
           let content=`
            Tên đăng nhập của quý khách: ${u}  <-+->
            Mật khẩu:${p}
            `
            SendEmail(email, content).then(() => { 
                alert(`Đã gửi thông tin tài khoản và mật khẩu đến email của quý khách.
                         Vui lòng check email để đăng nhập!`);
                       
          }).catch(()=>alert("Gửi mail thất bại vui lòng kiểm tra đường truyền!"))
          }
        })
        .catch((err) => {
          alert("Error: Something is wrong! Maybe the API is having problems");
          console.log(
            "Error: Something is wrong! Maybe the API is having problems"
          );
        });
      
    
    }
    render() {
        return (
            <div>
   <div
            className="modal fade" id="forgotPwModal" tabIndex={-1} role="dialog" aria-labelledby="forgotPwLabel" aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title font-weight-bold" id="forgotPwLabel">
                  Form quên mật khẩu
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form className="was-validated" onSubmit={this.checkEmail} >
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Nhập email của bạn"
                        required
                      />
                      <div className="invalid-feedback">
                        Trường này phải là email
                      </div>
                      <div id="incorrect-email"></div>
                      
                    </div>
                          
                    <button
                      type="submit"
                      className="btn btn-info btn-rounded"
                      id="ForgotP"
                      name="ForgotP"
                    >
                      Kiểm Tra
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      
            </div>
         
        );
    }
}

export default ForgotPassword;
