import React, { Component } from 'react';

class DeliveryDetails extends Component {
  render() {
    const { shipping } = this.props;
    const deadline = shipping && shipping.time

    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Dados de entrega</span>
        </div>
        <div className="finished-deadline">
          <p>{`Prazo previsto: ${deadline} dias úteis`}</p>
        </div>
      </div>
    );
  }
}

export default DeliveryDetails;