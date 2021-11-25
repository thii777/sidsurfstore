import React, { Component } from 'react';
import { formatMoney } from '../../utils';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptIcon from '@mui/icons-material/Receipt';

class PaymentForm extends Component {

  render() {
    let { payment } = this.props;
    const install = payment && payment.installment;
    const value = payment && install ? parseFloat(payment.value / install) : payment && payment.value
    payment = payment && payment.paymentForm;
    const credCard = payment === "CREDIT_CARD"

    return (
      <div className="finished-each-box">
        <div className="finished-title">
          <span>Meios de pagamento</span>
        </div>
        <div className="finished-payment">
          <div className="flag">
            <p>{credCard ? <CreditCardIcon /> : <ReceiptIcon />}</p>
          </div>
          <div className="value">
            <p className="finished-paragraph">{`Em ${install ? install : "1"}x de ${formatMoney(value)}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentForm;