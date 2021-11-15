import React, { Component } from 'react';

import Produtos from '../../components/Listas/Produtos';

const PRODUTOS = [
  {
    id: 93856,
    fotos: ["/static/img/shirt-oakley.jpg"],
    titulo: "Camiseta Oakley",
    preco: 129,
    promocao: 109
  },
  {
    id: 99056,
    fotos: ["/static/img/short-green.jpg"],
    titulo: "Short Estampado",
    preco: 55,
    promocao: 55
  },
  {
    id: 95456,
    fotos: ["/static/img/tenis-nike-air-max.jpg"],
    titulo: "Tenis da nike air max",
    preco: 599,
    promocao: 429
  },
  {
    id: 97056,
    fotos: ["/static/img/meia-stance.jpg"],
    titulo: "Meia stance",
    preco: 160,
    promocao: 150
  },
];

class ProdutosRelacionados extends Component {
  render() {
    return (
      <div className="Produtos-Relacionados flex vertical">
        <h2>Produtos Relacionados</h2>
        <br />
        <Produtos
          produtos={PRODUTOS}
          itensPorLinha={4} />
      </div>
    );
  };
};

export default ProdutosRelacionados;