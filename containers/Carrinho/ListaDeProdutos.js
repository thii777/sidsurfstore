import React, { Component } from "react";

import { connect } from "react-redux";

import actions from "../../redux/actions";
import { formatMoney } from "../../utils";
import { addCart } from "../../utils/cart";

class ListaDeProdutos extends Component {
  renderCabecalhoCarrinho(semAlteracoes) {
    return (
      <div className="carrinho-cabecalho no-mb-flex flex">
        <div className="flex-4"></div>
        <div className="headline flex-1 flex flex-center">
          <h3 className="text-center">QTD</h3>
        </div>
        <div className="headline flex-1 flex flex-center">
          <h3 className="text-center">Preço Total</h3>
        </div>
        {!semAlteracoes && <div className="flex-1"></div>}
      </div>
    );
  }

  changeQuantidade(e, quantidade, item, index) {
    const { produto } = this.props;

    if (Number(e.target.value) < 1) return;
    let novaQuantidade = Number(e.target.value);
    let change = novaQuantidade - quantidade;
    if (novaQuantidade >= 10) {
      return alert("Não temos essa quantidade em estoque.");
    }
    addCart(
      {
        // productName: item.productName,
        produto: item.produto,
        variacao: item.variacao,
        quantidade: change, //item.quantidade,
        // precoUnitario: item.precoUnitario,
        // foto: item.foto,
      },
      false
    );
    this.props.updateQuantidade(change, index);
  }

  removerProdutoCarrinho(index) {
    if (window.confirm("Você deseja realmente remover esse produto?")) {
      this.props.removerProduto(index);
    }
  }

  renderProduto(item, semAlteracoes, index) {
    const foto = item.foto || null;
    const { quantidade, precoUnitario, productName: nome, variationId } = item;
    return (
      <div key={item.id} className="carrinho-item flex">
        <div className="flex-4 flex">
          <div className="produto-image flex-2 flex flex-center">
            <img src={foto} alt={nome} width="100px" />
          </div>
          <div className="produto-titulo flex-4 flex flex-start">
            <h3 className="text-center">
              {nome}&nbsp; - {variationId}
            </h3>
          </div>
        </div>
        <div className="flex-1 flex flex-center cart-quantity-desktop">
          {semAlteracoes ? (
            <span>{quantidade}</span>
          ) : (
            <input
              type="number"
              value={quantidade}
              className="produto-quantidade"
              onChange={(e) =>
                this.changeQuantidade(e, quantidade, item, index)
              }
            />
          )}
        </div>
        <div className="flex-1 flex flex-center cart-multiply-quantity-desktop">
          <span>{formatMoney(precoUnitario * quantidade)}</span>
        </div>
        {!semAlteracoes && (
          <div
            className="flex-1 flex flex-center cart-remove-product-desktop"
            onClick={() => this.removerProdutoCarrinho(index)}
          >
            <span className="fa fa-trash"></span>
          </div>
        )}
        {/* Mobile */}
        <div className="quantity-value-mobile">
          <div className="flex-1 flex flex-center ">
            {semAlteracoes ? (
              <span>{quantidade}</span>
            ) : (
              <input
                type="number"
                value={quantidade}
                className="produto-quantidade"
                onChange={(e) =>
                  this.changeQuantidade(e, quantidade, item, index)
                }
              />
            )}
            {!semAlteracoes && (
              <div
                className="flex-1 flex flex-center"
                onClick={() => this.removerProdutoCarrinho(index)}
              >
                {/* <span className="fa fa-trash">Excluir</span> */}
                <span><a>Excluir</a></span>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-center">
            <span>{formatMoney(precoUnitario * quantidade)}</span>
          </div>
        </div>
      </div>
    );
  }

  renderProdutos(semAlteracoes) {
    return this.props.carrinho.map((item, index) =>
      this.renderProduto(item, semAlteracoes, index)
    );
  }

  render() {
    const { semAlteracoes, carrinho } = this.props;
    return (
      <div className="Lista-De-Produtos flex vertical">
        {this.renderCabecalhoCarrinho(semAlteracoes)}
        {carrinho && this.renderProdutos(semAlteracoes)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carrinho: state.carrinho.carrinho,
});

export default connect(mapStateToProps, actions)(ListaDeProdutos);
