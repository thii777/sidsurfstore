import React, { Component } from "react";

import DadosFrete from "./DadosFrete";
import DadosPagamento from "./DadosPagamento";
import DadosPedido from "./DadosPedido";

import CheckoutButton from "./CheckoutButton";

class CheckoutContainerFinal extends Component {

  render() {
    return (
      <div className="checkout container">
        <div className="checkout-title flex flex-center">
          <h2>Dados de pagamento</h2>
        </div>
        <div className="componentes-container">
          <DadosPagamento />
          <DadosPedido />
        </div>
      
      </div>
    );
  }
}

export default CheckoutContainerFinal;
