import React, { Component } from 'react';

import DadosCliente from './DadosCliente';
import DadosEntrega from './DadosEntrega';
import SubmitDadosCliente from './SubmitDadosCliente';

class CheckoutContainer extends Component {
  render() {
    return (
      <div className="checkout container">
        <div className="componentes-container">
          <DadosCliente />
          <DadosEntrega />
        </div>
        <SubmitDadosCliente />
      </div>
    );
  };
};

export default CheckoutContainer;