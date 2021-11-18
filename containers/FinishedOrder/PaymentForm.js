import React, { Component } from 'react';

class PaymentForm extends Component {
  render() {
    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Meios de pagamento</span>
        </div>
        <div className="finished-payment">
          <div className="flag">
          </div>
          <div className="value">
            <p>Em 6x de R$ 41,68</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentForm;