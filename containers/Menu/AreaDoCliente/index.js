import React, { Component } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import Router from "next/router";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { fetchClient } from "../../../redux/actions/clientActions";
import { cleanToken } from "../../../utils/token";

import axios from "axios";
import { API, loja } from "../../../config";
import { getHeaders } from "../../../redux/actions/helpers";

class MenuAreaDoCliente extends Component {
  state = {
    userName: "",
  };
  async componentDidMount() {
    const { token } = this.props;
    // console.log(usuario, this.state.userName, "componentDidUpdate")

    try {
      if (token) {
        const { data } = await axios.get(
          `${API}/stores/${loja}/clients/me`,
          getHeaders(token)
        );
        if (data) {
          this.setState({ userName: data.userName });
        }
      }
    } catch (e) {
      throw e;
    }
  }

  componentDidUpdate(prevProps) {
    const { usuario, token, cliente } = this.props;

    if (usuario && token && !cliente) {
    }
  }

  async fetchCliente() {
    const { usuario, token, cliente } = this.props;

    if (usuario && token && !cliente) {
      const client = await fetchClient(token);
    }
  }

  async handleLougot() {
    cleanToken();
  }

  renderCabecalho() {
    const { userName } = this.state;

    return (
      <div>
        <h3>{`Olá ${(userName && userName.toUpperCase()) || "Visitante"}`}</h3>
      </div>
    );
  }

  renderMenu() {
    const url = this.props.router.pathname;
    const estaEmDados = url.includes("/customer-area/data");
    const estaEmAlterarSenha = url.includes("/customer-area/change-password");
    const estaEmPedidos = !estaEmDados && !estaEmAlterarSenha;
    return (
      <div className="menu-lateral">
        <Link href="/customer-area">
          <div
            className={`menu-lateral-item ${
              estaEmPedidos ? "menu-lateral-item-active" : ""
            }`}
          >
            <span>MEUS PEDIDOS</span>
          </div>
        </Link>
        <Link href="/customer-area/data">
          <div
            className={`menu-lateral-item ${
              estaEmDados ? "menu-lateral-item-active" : ""
            }`}
          >
            <span>MEUS DADOS</span>
          </div>
        </Link>
        <Link href="/customer-area/change-password">
          <div
            className={`menu-lateral-item ${
              estaEmAlterarSenha ? "menu-lateral-item-active" : ""
            }`}
          >
            <span>ALTERAR SENHA</span>
          </div>
        </Link>
        <Link href="/">
          <div
            className="menu-lateral-item"
            onClick={() => this.handleLougot()}
          >
            <span>SAIR</span>
          </div>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="flex-1 flex vertical">
        {this.renderCabecalho()}
        {this.renderMenu()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.auth.usuario,
  token: state.auth.token,
  cliente: state.cliente,
});

export default connect(mapStateToProps, actions)(withRouter(MenuAreaDoCliente));
