import React, { Component } from "react";
import callAPI from "../../API/callAPI";
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
    let statusOrder = "Chờ xử lý";
    const data = this.state.orders[index];
    if (data.status === 1) {
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

      console.table(index, id, data.status);
      
      //put to JSON server
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

      await callAPI(`orders/${id}`, "PUT", data).then(() => {
        alert("Hủy đơn thành công!");
      });
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div>
        <table className="table text-center">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Tên khách hàng</th>
              <th>Sản phầm mua</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
              <th>Ngày mua</th>
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
