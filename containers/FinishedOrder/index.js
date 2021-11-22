import React, { Component } from "react";
import { withRouter } from 'next/router';

import DadosPedido from "../Checkout/DadosPedido";
import OrderNumber from "./OrderNumber";
import PaymentForm from "./PaymentForm";
import DeliveryDetails from "./DeliveryDetails";

class UpdateOrCreateNewDelivery extends Component {

  render() {
    const { id } = this.props.router.query

    return (
      <div className="success-container">
        <div className="success-components">
          <div className="success-title flex flex-center">
            <h2 className="success-title_h2">Pedido realizado com sucesso</h2>
          </div>
          <div className="finished-order">
            <OrderNumber />
            <PaymentForm />
            <DeliveryDetails />
            <DadosPedido />
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(UpdateOrCreateNewDelivery);
