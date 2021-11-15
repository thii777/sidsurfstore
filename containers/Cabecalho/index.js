import React from "react";
import Link from "next/link";

import Logo from "../../components/Logo/Cabecalho";
import CampoPesquisa from "../../components/Campos/Pesquisa";
import MenuResponsive from "../../components/menuResponsive";
import CardCarrinho from "../../components/Cards/Carrinho";
import CardCarrinhoResponsive from "../../components/Cards/CarrinhoResponsive";
import Categorias from "../../components/Listas/Categorias";

class Cabecalho extends React.Component {
  renderCabecalhoNormal() {
    return (
      <div className="Header">
        <div className="header-wrapper">
          <div className="logo-header-responsive">
            <MenuResponsive />
            <Logo />
            <CardCarrinhoResponsive />
          </div>
          <div className="flex-align-center icons-header">
            <CampoPesquisa />
            <CardCarrinho />
          </div>
        </div>
        <div className="categorias-wrapper">
          <Categorias />
        </div>
      </div>
    );
  }

  renderCabecalhoSimples(title) {
    return (
      <div className="Header No-Links Header-Simples">
        <div className="header-wrapper container">
          <Logo />
          <h2>{title}</h2>
        </div>
      </div>
    );
  }

  render() {
    const { simples, title } = this.props;
    return simples
      ? this.renderCabecalhoSimples(title)
      : this.renderCabecalhoNormal();
  }
}

export default Cabecalho;
