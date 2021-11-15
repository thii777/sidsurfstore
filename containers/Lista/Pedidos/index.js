import React, { Component } from "react";
import moment from "moment";

import Pedidos from "../../../components/Listas/Pedidos";
// import Paginacao from "../../../components/Paginacao";
import actions from "../../../redux/actions";
import { connect } from "react-redux";

class ListaPedidos extends Component {
  state = { atual: 0 };

  componentDidMount() {
    const { token, fetchPedidos } = this.props;
    if (token) fetchPedidos(token);
  }

  componentDidUpdate() {
    const { token, pedidos, fetchPedidos } = this.props;
    if (!pedidos) fetchPedidos(token);
  }

  render() {
    const { pedidos: orders } = this.props;

    let PEDIDOS;
    if (orders && orders.length) {
      PEDIDOS = orders.map((order) => {
        return {
          id: order.orderId,
          data: moment(order.created_at).format("DD/MM/YYYY"),
          valor: order.total,
          status: order.status || "pagamento em analise",
        };
      });
    }

    if (!orders || orders == null) PEDIDOS = null;

    return (
      <div className="flex-4 conteudo-area-cliente">
        <h2>MEUS PEDIDOS</h2>
        <br />
        <Pedidos pedidos={PEDIDOS} />
        {/* <Paginacao
          atual={this.state.atual || 0}
          total={PEDIDOS.length * 4}
          limite={PEDIDOS.length}
          onClick={(numeroAtual) => this.setState({ atual: numeroAtual })} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  test: state,
  pedidos: state.pedido.pedidos,
  token: state.auth.token,
  // usuario: state.auth.usuario,
  // cliente: state.cliente.cliente
});

export default connect(mapStateToProps, actions)(ListaPedidos);
