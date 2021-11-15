import React, { Component } from 'react';

import Layout from '../../../components/Layout';
import Cabecalho from '../../../containers/Cabecalho';
import PedidoContainer from '../../../containers/Pedido';
import Rodape from '../../../containers/Rodape';

export default class Request extends Component {
  render() {
    return(
      <Layout title="Pedido | LOJA SID SURF STORE">
        <Cabecalho simples/>
        <PedidoContainer />
        <Rodape />
      </Layout>
    );
  };
};