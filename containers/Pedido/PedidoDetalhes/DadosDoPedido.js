import React, { Component } from "react";

import { formatMoney } from "../../../utils";
// import TextoDados from "../../../components/Texto/Dados";

import TabelaSimples from "../../../components/Tabela/Simples";
import actions from "../../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "next/router";

class DadosDoPedido extends Component {
  componentDidMount() {
    const { token, fetchPedido } = this.props;
    const { request: id } = this.props.router.query;
    if (token) fetchPedido(id, token);
  }

  componentDidUpdate() {
    const { token, pedido, fetchPedido } = this.props;
    const { request: id } = this.props.router.query;
    if (!pedido) fetchPedido(id, token);
  }

  renderDadosDoCliente() {
    const { pedido } = this.props;
    return (
      <div className="flex-3">
        <h4 className="headline">{`DADOS DO CLIENTE`}</h4>
        <br />
        {/* <TextoDados
          chave="Nome"
          valor={pedido && pedido.order.customer.userName}
        />
        <TextoDados chave="CPF" valor={pedido && pedido.order.customer.cpf} />
        <TextoDados
          chave="Telefone"
          valor={(pedido && pedido.order.customer.phone) || ""}
        />
        <TextoDados
          chave="Data de Nascimento"
          valor={pedido && pedido.order.customer.dateOfBirth}
        /> */}
      </div>
    );
  }

  renderDadosDeEntrega() {
    // const { pedido } = this.props;
    return (
      <div className="flex-3">
        <h4 className="headline">DADOS ENTREGA</h4>
        <br />
        {/* <TextoDados
          chave="Endereço"
          valor={`${pedido && pedido.order.address.street} ${
            pedido && pedido.order.address.number
          }`}
        />
        <TextoDados
          chave="Bairro"
          valor={pedido && pedido.order.address.neighborhood}
        />
        <TextoDados
          chave="Complemento"
          valor={pedido && pedido.order.address.complement}
        />
        <TextoDados
          chave="Cidade"
          valor={pedido && pedido.order.address.city}
        />
        <TextoDados
          chave="Estado"
          valor={pedido && pedido.order.address.state}
        /> */}
        {/* <TextoDados
          chave="CEP"
          valor={pedido && pedido.order.address.zipcode}
        /> */}
      </div>
    );
  }

  renderDadosDoCarrinho() {
    const { pedido } = this.props;

    const carrinho =
      pedido &&
      pedido.order.items.map((item) => {
        return {
          Produto: item.name,
          "Preço Und.": formatMoney(item.offerPrice || item.salesPrice),
          Quantidade: item.amount,
          "Preço Total": formatMoney(item.offerPrice * item.amount || item.salesPrice * item.amount),
        };
      });

    return (
      <div className="">
        <h4 className="headline">CARRINHO</h4>
        <br />
        <TabelaSimples
          cabecalho={["Produto", "Preço Und.", "Quantidade", "Preço Total"]}
          dados={carrinho}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="Detalhes-do-Pedido">
        <div className="flex horizontal">
          {this.renderDadosDoCliente()}
          {this.renderDadosDeEntrega()}
        </div>
        <div className="flex horizontal">{this.renderDadosDoCarrinho()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pedido: state.pedido.pedido,
  token: state.auth.token,
});

export default connect(mapStateToProps, actions)(withRouter(DadosDoPedido));
