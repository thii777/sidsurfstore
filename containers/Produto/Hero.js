import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { formatMoney } from "../../utils";
import { addCart } from "../../utils/cart";
import { getCountItemsCart } from "../../utils/cart";
import DataContext from "../Context/DataContext";

class Hero extends Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);
    const { produto } = props;
    this.state = {
      foto: produto.variations
        ? produto.variations[0].images[0].path || null
        : null,
      fotos: produto.variations
        ? produto.variations[0].images.map((item) => item.path) || []
        : [],
      productName: produto.productName,
      variationName: produto.variations[0].variationName,
      prices: produto.variations[0].prices,
      offerPrice: produto.variations[0].offerPrice,
      variations: produto.variations,
      productId: produto.productId,
      color: produto.variations[0].colorName,
      size: produto.variations[0].size,
      // For addCart
      qtd: 1,
      variationId:
        produto.variations && produto.variations.length >= 1
          ? produto.variations[0].variationId
          : null,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.produto.variations && this.props.produto.variations) {
      const { fotos } = this.props.produto.variations[0].images.map(
        (item) => item.path
      );
      this.setState({ foto: fotos[0], fotos });
    }
    if (!prevProps.produto.variations && this.props.produto.variations) {
      const variacao = this.props.produto.variations[0];
      if (!variacao) return null;
      this.setState({ variacao: variacao[0].variationId });
    }
  }

  renderPhotos() {
    return (
      <div className="fotos flex-2 flex vertical">
        <div className="box-images flex-1">
          <div className="mini-fotos">
            {this.state.fotos.map((foto, index) => (
              <div
                key={index}
                className="mini-foto flex-1 flex flex-center"
                onClick={() => this.setState({ foto })}
              >
                <img src={foto} width="90%" />
              </div>
            ))}
          </div>
          <div className="foto-principal flex-6 flex flex-center">
            <img src={this.state.foto} width="95%" />
          </div>
        </div>
      </div>
    );
  }

  renderVariacoesColor() {
    let { variations, color } = this.state;
    const { produto } = this.props;

    variations = [
      ...variations
        .reduce((map, obj) => map.set(obj.colorName, obj), new Map())
        .values(),
    ];

    return (
      <div>
        <div className="titleProductDetails">
          <label>{`COR: ${color}`}</label>
        </div>
        <div className={"variacoes flex wrap"}>
          {variations.map((item) => {
            return (
              <div
                className={`${
                  item.quantity
                    ? "variacao-item-color"
                    : "variacao-item-color-empty"
                } flex-1 flex flex-center wrap-4`}
              >
                <span className="item-color">
                  <img
                    src={
                      item.images && item.images.length
                        ? item.images[0].path
                        : ""
                    }
                    width="35"
                    onClick={() =>
                      this.setState({
                        foto: item.images[0].path,
                        fotos: item.images.map((item) => item.path),
                        variationId: item.variationId,
                        color: item.colorName,
                        size: item.size,
                        prices: item.prices
                          ? item.prices
                          : produto.variations[0].prices,
                        offerPrice: item.offerPrice
                          ? item.offerPrice
                          : produto.variations[0].offerPrice,
                      })
                    }
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderVariacoesSize() {
    const { variations, color } = this.state;
    const { produto } = this.props;

    return (
      <div>
        <div className="titleProductDetails">
          <label>TAMANHO</label>
        </div>
        <div className={"variacoes flex wrap"}>
          {variations
            .map((item) => {
              if (item.colorName == color) {
                return (
                  <div
                    className={`${
                      item.quantity
                        ? "variacao-item-size"
                        : "variacao-item-size-empty"
                    } flex-1 flex flex-center wrap-4`}
                  >
                    <span
                      className="item-size"
                      onClick={() =>
                        this.setState({
                          variationId: item.variationId,
                          size: item.size,
                          prices: item.prices
                            ? item.prices
                            : produto.variations[0].prices,
                          offerPrice: item.offerPrice
                            ? item.offerPrice
                            : produto.variations[0].offerPrice,
                        })
                      }
                    >
                      {item.size}
                    </span>
                  </div>
                );
              }
            })
            .filter((item) => item)}
        </div>
      </div>
    );
  }

  addCartHandler() {
    const {
      variationId,
      productId,
      productName,
      prices,
      offerPrice,
      color,
      size,
      qtd,
      foto,
    } = this.state;

    addCart(
      {
        variationId: variationId,
        produto: productId,
        productName: `${productName}`,
        precoUnitario: offerPrice ? offerPrice : prices,
        foto: foto || null,
        quantidade: qtd,
      },
      true
    );
    this.context.updateQtd(getCountItemsCart());
  }

  renderDetalhes() {
    const { variationName, prices, offerPrice, color } = this.state;

    return (
      <div className="flex-1 produto-detalhes">
        <div className="titulo">
          <h2>{`${variationName}`}</h2>
        </div>
        {/* <br /> */}
        <div className="avaliacao-pontuacao flex-1 flex">
          <span>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        </div>
        <div className="precos">
          <h2 className="preco-original preco-por">{formatMoney(prices)}</h2>
          <h2 className="preco-promocao">
            {formatMoney(offerPrice) || prices}
          </h2>
          <h4 className="preco-parcelado">
            ou em 6x de {formatMoney(offerPrice / 6) || prices / 6} sem juros
          </h4>
        </div>
        <br />
        {this.renderVariacoesColor()}
        {this.renderVariacoesSize()}

        <div className="opcoes">
          <div className="opcao flex vertical">
            <label className="titleProductDetails">QUANTIDADE:</label>
            <input
              className="opcao-input"
              type="number"
              name="quantidade"
              defaultValue={1}
            />
          </div>
        </div>
        <div className="comprar">
          <Link href="/cart">
            <button
              className="btn btn-success btn-cta btn-product-details"
              onClick={() => this.addCartHandler()}
            >
              COMPRAR AGORA
            </button>
          </Link>
          <button
            className="btn btn-cta btn-add btn-product-details"
            onClick={() => this.addCartHandler()}
          >
            <p>ADICIONAR AO CARRINHO</p>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Produto-Hero flex horizontal">
        {this.renderPhotos()}
        {this.renderDetalhes()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  produto: state.produto.produto,
  variacoes: state.produto.variacoes,
  token: state.auth.token,
});

export default connect(mapStateToProps)(Hero);
