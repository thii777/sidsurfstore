import React, { Component } from 'react';

import DadosDoPedido from './DadosDoPedido';
import StatusPedido from './StatusPedido';
import actions from "../../../redux/actions";
import { connect } from "react-redux";

class PedidoDetalhes extends Component {

  render() {
    const { pedido } = this.props;
    return (
      <div className="flex-4 conteudo-area-cliente">
        <div className="flex-space">
          <h2>{`PEDIDO ${pedido && pedido.order.Id}`}</h2>
          <button className="btn btn-primary btn-sm">CANCELAR PEDIDO</button>
        </div>
        <br/>
        <div>
          <DadosDoPedido />
        </div>
        <br/><br/>
        <div className="flex horizontal">
          <StatusPedido />
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  pedido: state.pedido.pedido,
  token: state.auth.token,
});

export default connect(mapStateToProps, actions)(PedidoDetalhes);
// export default PedidoDetalhes;