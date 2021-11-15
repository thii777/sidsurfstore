import React, { Component } from 'react';

import ListaStatus from '../../../components/Listas/Status';

const REGISTROS = [
  { data: "08/07/2020", situacao: "Pedido recebido"},
  { data: "08/07/2020", situacao: "Pagamento Aprovado"},
  { data: "10/07/2020", situacao: "Objeto em separação"},
  { data: "11/07/2020", situacao: "Objeto entregue na transportadora"},
  { data: "15/07/2020", situacao: "Objeto em entregue"},
];

class StatusPedido extends Component {
  render() {
    return (
      <div className="flex-1">
        <div className="Detalhes-Da-Entrega">
          <h4>Status do pedido</h4>
          <br/>
          <ListaStatus registros={REGISTROS} />
        </div>
      </div>
    );
  };
};

export default StatusPedido;