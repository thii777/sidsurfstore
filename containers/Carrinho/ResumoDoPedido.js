import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../redux/actions";
import { formatMoney } from "../../utils";

class ListaDeProdutos extends Component {
  state = {
    subtotal: "",
    frete: "",
    discount: "",
  };

  renderCabecalhoCarrinho() {
    const calculateTotal =
      Number(this.state.subtotal) +
      Number(this.state.frete) -
      Number(this.state.discount);

    return (
      <div className="carrinho-item">
        <div className="flex-space resumo_pedido-title">
          <p>Subtotal</p>
          <span>{formatMoney(this.state.subtotal)}</span>
        </div>
        <div className="flex-space resumo_pedido-title">
          <p>Preço do frete</p>
          <span>{formatMoney(this.state.frete)}</span>
        </div>
        <div className="flex-space resumo_pedido-title">
          <p>Desconto</p>
          <span>{formatMoney(this.state.discount)}</span>
        </div>
        <div className="flex-space resumo_pedido-title resumo_pedido-title-total">
          <p>TOTAL</p>
          <span>{formatMoney(calculateTotal)}</span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { carrinho } = this.props;
    if (carrinho) {
      let count = [];
      for (let item of carrinho) {
        count.push(parseInt(item.precoUnitario * item.quantidade));
      }

      let value = 0;
      for (let i = 0; i < count.length; i++) {
        value = value += count[i];
      }
      this.setState({ subtotal: value });
    }
  }

  renderProduto(item) {
    const foto = item.foto || null;
    const { quantidade, precoUnitario, productName: nome } = item;

    return (
      <div key={item.id} className="carrinho-item">
        <div className="flex-space resumo_pedido">
          <div className="produto-image">
            <img src={foto} alt={nome} width="100px" />
          </div>

          <div className="produto-titulo">
            <h3 className="text-center">{nome}</h3>
            <span>{formatMoney(precoUnitario)}</span>
          </div>

          <div className="">
            <h3 className="text-center">QTD</h3>
            <span>{quantidade}</span>
          </div>
        </div>
      </div>
    );
  }

  renderProdutos() {
    return this.props.carrinho.map((item) => this.renderProduto(item));
  }

  render() {
    const { carrinho } = this.props;
    return (
      <div className="Lista-De-Produtos flex vertical">
        {carrinho && this.renderProdutos()}
        {this.renderCabecalhoCarrinho()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho.carrinho,
});

export default connect(mapStateToProps, actions)(ListaDeProdutos);
