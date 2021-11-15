import React, { Component } from "react";

import Layout from "../../components/Layout";
import Cabecalho from "../../containers/Cabecalho";
import AreaDoClienteContainer from "../../containers/AreaDoCliente";
import Rodape from "../../containers/Rodape";
import { connect } from "react-redux";
import actions from "../../redux/actions";

import initialize from "../../utils/initialize";
import callBaseData from "../../utils/callBaseData";

class CustomerArea extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);
    return callBaseData([ ], ctx);
  }

  async componentDidMount() {
    await this.props.getUser({ token: this.props.token });
  }

  render() {
    return (
      <Layout title="Minha Conta | LOJA SID SURF STORE">
        <Cabecalho simples />
        <AreaDoClienteContainer />
        <Rodape />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, actions)(CustomerArea);
