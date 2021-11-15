import React from 'react';
import Link from 'next/link';

const Paginas = () => (
  <div className="flex-1 flex vertical institucional">
    <div>
      <h2>Paginas</h2>
      <br/>
    </div>
    <Link href="/">
      <span>Pagina Inicial</span>
    </Link>
    <Link href="/cart">
      <span>Ver Carrinho</span>
    </Link>
    <Link href="/customer-area/">
      <span>Minha Conta</span>
    </Link>
    <Link href="/sobre">
      <span>Sobre a Loja</span>
    </Link>
  </div>
);

export default Paginas;