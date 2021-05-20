import React, { Component } from "react";
import callAPI from "../../API/callAPI";
class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  async componentDidMount() {
    await callAPI("orders", "GET", null).then((res) => {
      this.setState(() => ({
        orders: res.data,
      }));
    });
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
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((order, index) => (
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
                  <button className="btn btn-sm btn-outline-success">
                    {order.status}
                  </button>
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
