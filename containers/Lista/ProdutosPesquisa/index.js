import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

import Produtos from "../../../components/Listas/Produtos";
import Paginacao from "../../../components/Paginacao";

class ProdutosPesquisa extends Component {
  state = {
    skip: 0,
    limit: 16,
  };

  getProdutos() {
    const { skip, limit } = this.state;
    const { termo } = this.props;

    this.props.fetchProdutosPesquisa(termo, skip, limit);
  }

  changeNumeroAtual = (skip) => {
    this.setState({ skip }, () => this.getProdutos());
  };

  render() {
    const { termo, produtosPesquisa } = this.props;

    return (
      <div className="container Categoria-Produtos">
        <Produtos
          produtos={produtosPesquisa ? produtosPesquisa : []}
          itensPorLinha={4}
        />
        <Paginacao
          skip={this.state.skip}
          limit={this.state.limit}
          total={produtosPesquisa.params.total_items} //produtosPesquisa.params.total_items} // adicionar regra no back para trazer apenas total filtrado
          onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  termo: state.produto.termo,
  produtosPesquisa: state.produto.produtosPesquisa,
});

export default connect(mapStateToProps, actions)(ProdutosPesquisa);
