import React, { Component } from 'react';

import ResumoDoPedido from '../Carrinho/ResumoDoPedido';

class DadosPedido extends Component {
  render() {
    return (
      <div className="Dados-Pedido-Container">
        <span>Resumo do pedido</span>
        <br/>
        <ResumoDoPedido />
        <br/>
      </div>
    );
  }
}

export default DadosPedido;