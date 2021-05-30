import React, { Component } from "react";
import callAPI from "../../API/callAPI";
import sendEmail from "../../Features/SendEmail";
class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
    this.changeStatusOrder = this.changeStatusOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  async componentDidMount() {
    await callAPI("orders", "GET", null).then((res) => {
      let ordersData = res.data.sort((a, b) =>
        a.status > b.status ? 1 : b.status > a.status ? -1 : 0
      ); //sort orders data follow status
      this.setState(() => ({
        orders: ordersData,
      }));
    });
  }

  async changeStatusOrder(id, index) {
    let statusOrder = "Hoàn thành";
    const data = this.state.orders[index];
    if (data.status === 0) {
      statusOrder = "Đang giao";
    }

    if (
      window.confirm(
        `Cập nhật trạng thái cho đơn có mã ${id} thành "${statusOrder}"`
      )
    ) {
      //change status
      if (data.status === 0) {
        data.status = 1;
      } else {
        data.status = 2;
      }

      let emailUser = await callAPI(
        `users?name=${data.customerName}`,
        "GET",
        null
      )
        .then((res) => res.data[0].email)
        .catch(() => null);

      if (emailUser !== null) {
        let message =
          data.status === 1
            ? `Quý khách đã đặt hàng vào lúc ${data.buyAt} và mã đơn là ${id}.
        Đơn hàng của quý khách đang ở trạng thái ${statusOrder}.
        Quý khách sẽ nhân được hàng trong 30 phút nữa.
        Cảm ơn quý khách đã đặt hàng.`
            : `Quý khách đã đặt hàng vào lúc ${data.buyAt} và mã đơn là ${id}.
        Đơn hàng của quý khách đang ở trạng thái ${statusOrder}.
        Chúc quý khách ngon miệng.
        Cảm ơn quý khách đã đặt hàng.`;
        sendEmail(emailUser, message)
          .then(() => {
            alert("Gửi email cho khách thành công!");
          })
          .catch(() => {
            alert("Gửi email cho khách không thành công!");
          });
      } else {
        alert("Gửi email cho khách hàng không thành công!");
      }

      // console.table(index, id, data.status);
      // put to JSON server
      await callAPI(`orders/${id}`, "PUT", data)
        .then(() => {
          alert("Cập nhật trạng thái cho đơn thành công!");
        })
        .catch(() => {
          alert("Cập nhật trạng thái cho đơn thất bại!");
        });

      this.componentDidMount(); //render again
    }
  }

  async cancelOrder(id, index) {
    if (window.confirm(`Hủy đơn có mã là ${id} ?`)) {
      let data = this.state.orders[index];
      data.status = 3;

      let emailUser = await callAPI(
        `users?name=${data.customerName}`,
        "GET",
        null
      )
        .then((res) => res.data[0].email)
        .catch(() => null);

      if (emailUser !== null) {
        let message = `Quý khách đã đặt hàng vào lúc ${data.buyAt} và mã đơn là ${id}.
        Hiện tại đơn hàng của quý khách đã bị hủy.
        Cảm ơn quý khách đã ghé thăm.`;
        sendEmail(emailUser, message)
          .then(() => {
            alert("Gửi email cho khách thành công!");
          })
          .catch(() => {
            alert("Gửi email cho khách không thành công!");
          });
      } else {
        alert("Gửi email cho khách hàng không thành công!");
      }

      await callAPI(`orders/${id}`, "PUT", data).then(() => {
        alert("Hủy đơn thành công!");
      });
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div>
        <table className="table text-center table-hover">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Tên khách hàng</th>
              <th>Sản phầm mua</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Ngày mua</th>
              <th>Địa chỉ giao</th>
              <th>Trạng thái</th>
              <th>Hủy đơn</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.slice().map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.productBought.map((product, index) => (
                    <span key={index}>
                      {product}
                      <br />
                    </span>
                  ))}
                </td>
                <td>
                  {order.quantity.map((qty, index) => (
                    <span key={index}>
                      {qty}
                      <br />
                    </span>
                  ))}
                </td>
                <td>{order.total}</td>
                <td>{order.buyAt}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  {order.status === 3 ? (
                    <span style={{ color: "red" }}>Đã bị hủy</span>
                  ) : order.status === 2 ? (
                    <span style={{ color: "#28A745" }}>Hoàn thành</span>
                  ) : (
                    <button
                      onClick={() => this.changeStatusOrder(order.id, index)}
                      className="btn btn-sm btn-outline-success"
                    >
                      {order.status === 0 ? "Chờ xử lý" : "Đang giao"}
                    </button>
                  )}
                </td>
                <td>
                  {order.status !== 2 && order.status !== 3 ? (
                    <button
                      onClick={() => this.cancelOrder(order.id, index)}
                      className="btn btn-sm btn-danger"
                    >
                      Hủy đơn
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderManagement;
