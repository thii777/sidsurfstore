import React, { Component } from 'react';

class OrderNumber extends Component {
  render() {
    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Número do pedido:</span>
          <p>90876509</p>
        </div>
        <div className="finished-button flex flex-center">
          <button>Acompanhe seu pedido</button>
        </div>
      </div>
    );
  }
}

export default OrderNumber;