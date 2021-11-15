import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Cabecalho from '../../containers/Cabecalho';
import AlterarSenhaContainer from '../../containers/AreaDoCliente/AlterarSenha';
import Rodape from '../../containers/Rodape';

export default class ChangePassword extends Component {
  render() {
    return(
      <Layout title="Alterar Senha | LOJA SID SURF STORE">
       <Cabecalho simples/>
       <AlterarSenhaContainer />
       <Rodape />
     </Layout>
    );
  };
};