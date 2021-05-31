import React from "react";
class PaymentByMoMo extends React.Component {
  iframe() {
    return {
      __html: this.props.iframe,
    };
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={this.iframe()} />
      </div>
    );
  }
}

export default PaymentByMoMo;
