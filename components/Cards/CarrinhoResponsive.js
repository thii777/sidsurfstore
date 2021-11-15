import React, { Component } from "react";
import Link from "next/link";
import DataContext from "../../containers/Context/DataContext";
import { getCountItemsCart } from "../../utils/cart";

class CardCarrinho extends Component {
  static contextType = DataContext;

  state = { cartQtd: 0 };

  componentDidMount() {
    this.setState({ cartQtd: getCountItemsCart() });
  }

  componentDidUpdate() {
    if (this.state.cartQtd !== this.context.state.qtd) {
    this.setState({ cartQtd: this.context.state.qtd });
    }
  }

  render() {
    return (
      <div className="itens-carrinho-responsive">
        <Link href="/cart">
          <div className="item-cabecalho cart">
            <i className="fa fa-shopping-cart"></i>
            <span>{this.state.cartQtd || 0}</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default CardCarrinho;
