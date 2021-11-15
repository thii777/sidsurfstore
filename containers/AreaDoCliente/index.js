import React, { Component } from "react";

import PedidosContainer from "./Pedidos";
import AcessoContainer from "./Acesso";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { getToken } from "../../utils/token";

class AreaDoClienteContainer extends Component {
  render() {
    const token = getToken && getToken();
    return token ? <PedidosContainer /> : <AcessoContainer />;
  }
}

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario,
});

export default connect(mapStateToProps, actions)(AreaDoClienteContainer);
