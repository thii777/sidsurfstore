import React, { Component } from 'react';

import Layout from '../components/Layout';
import Cabecalho from '../containers/Cabecalho';
import CarrinhoContainer from '../containers/Carrinho';
import Rodape from '../containers/Rodape';

export default class Cart extends Component {
  render() {
    return(
      <Layout title="Carrinho | LOJA SID SURF STORE">
        <Cabecalho simples />
        <CarrinhoContainer />
        <Rodape />
      </Layout>
    );
  };
};