import React, { Component } from 'react';

class DeliveryDetails extends Component {
  render() {
    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Dados de entrega</span>
        </div>
        <div className="finished-deadline">
          <p>Prazo previsto: 3 dias úteis</p>
        </div>
      </div>
    );
  }
}

export default DeliveryDetails;