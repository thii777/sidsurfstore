import React, { Component } from 'react';

class OrderNumber extends Component {
  render() {
    const { orderId } = this.props;

    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Número do pedido:</span>
          <p>{orderId}</p>
        </div>
        <div className="finished-button flex flex-center">
          <button>Acompanhe seu pedido</button>
        </div>
      </div>
    );
  }
}

export default OrderNumber;