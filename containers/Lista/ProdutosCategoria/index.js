import React, { Component } from "react";

import Produtos from "../../../components/Listas/Produtos";
import Paginacao from "../../../components/Paginacao";

import { connect } from "react-redux";
import actions from '../../../redux/actions';


class ProdutosCategoria extends Component {
  state = {
    skip: 0,
    limit: 4,
  };

  getProdutos() {
    const { skip, limit } = this.state;
    const {categoria} = this.props;

    this.props.fetchProdutosCategoria(categoria.categoryId, skip, limit);
  }

  changeNumeroAtual = (skip) => {
    this.setState({ skip }, () => this.getProdutos());
  }

  render() {
    const { produtosCategoria, categoria } = this.props;

    return (
      <div className="container Categoria-Produtos">
        <br /> <br />
        <div className="flex flex-center">
          <h1>{categoria ? categoria.categoryName : "-"}</h1>
        </div>
        <br />
        <Produtos
          produtos={produtosCategoria ? produtosCategoria : []}
          itensPorLinha={4}
        />
        <Paginacao
          skip={this.state.skip}
          limit={this.state.limit}
          total={produtosCategoria.params.total_items}
          onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual) } 
          />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categoria: state.categoria.categoria,
  produtosCategoria: state.categoria.produtosCategoria,
});

export default connect(mapStateToProps, actions)(ProdutosCategoria);
