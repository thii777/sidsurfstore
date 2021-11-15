import React, { Component } from 'react';
import Link from 'next/link';

class SubmitDadosCliente extends Component {
  render() {
    return (
      <div>
        <div className="flex flex-right">
          <Link href="/checkoutFinal">
            <button
              className="btn btn-success btn-cta"
              onClick={() => console.log('Continuar pedido')}>
              IR PARA PAGAMENTO
            </button>
          </Link>
        </div>
      </div>
    );
  };
};

export default SubmitDadosCliente;