import React, { Component } from "react";
import Link from "next/link";

import { formatMoney } from "../../utils";

class Produto extends Component {
  render() {
    const { item, porLinha } = this.props;
    const {
      productId,
      variationName,
      productName,
      salesPrice,
      offerPrice,
      images,
    } = item;

    const temPromo = offerPrice && salesPrice !== offerPrice;
    return (
      <Link href={`/product/${productName}?id=${productId}`}>
        <div
          className={`produto flex-1 vertical wrap-${porLinha} wrap-2-mb`}
        >
          <div className="produto-image flex flex-center">
            <img
              src={`${images}`} // ajuste
              alt={variationName || productName}
              style={{ maxWidth: "95%" }}
            />
          </div>
          <div className="produto-title flex flex-center">
            <h3>{variationName || productName}</h3>
          </div>
          <br />
          <span className="evaluation-stars flex flex-center">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
          <div
            className={`produto-preco ${
              temPromo ? "produto-por" : ""
            } flex flex-center`}
          >
            <h2>{formatMoney(salesPrice)}</h2>
          </div>
          {temPromo && (
            <div className={`produto-preco-promocao flex flex-center`}>
              <h2>{formatMoney(offerPrice)}</h2>
            </div>
          )}
          <div className={`produto-preco-parcelado flex flex-center`}>
            <p>
              ou 6x de {formatMoney((offerPrice / 6 || salesPrice) / 6)} s/
              juros
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Produto;
