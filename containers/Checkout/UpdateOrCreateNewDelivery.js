import React, { Component } from 'react';

import DadosPedido from './DadosPedido';
import AtualizacaoDadosEntrega from '../Carrinho/AtualizacaoDadosEntrega';

class UpdateOrCreateNewDelivery extends Component {
    render() {
        return (
            <div className="checkout container">
                <div className="checkout-title flex flex-center">
                    <h2>Confirme dados de entrega</h2>
                </div>
                <div className="componentes-container">
                    <AtualizacaoDadosEntrega />
                    <DadosPedido />
                </div>
            </div>
        );
    };
};

export default UpdateOrCreateNewDelivery;