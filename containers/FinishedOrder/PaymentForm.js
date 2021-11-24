import React, { Component } from 'react';

class PaymentForm extends Component {

  render() {
    const { payment } = this.props;
    const install = payment && payment.installment ? payment.installment : "";

    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Meios de pagamento</span>
        </div>
        <div className="finished-payment">
          <div className="flag">
            {/* <p>{payment.paymentForm}</p> */}
          </div>
          <div className="value">
            {/* <p>{`Em ${install ? install : "1x"} de ${install ? payment.value / install : payment.value}`}</p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentForm;