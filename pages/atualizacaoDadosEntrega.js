import React, { Component } from 'react';

import Layout from '../components/Layout';

import Cabecalho from '../containers/Cabecalho';
import CheckoutContainerFinal from '../containers/Checkout/CheckoutFinal';
import UpdateOrCreateNewDelivery from '../containers/Checkout/UpdateOrCreateNewDelivery';
import Rodape from '../containers/Rodape';

export default class Checkout extends Component {
    render() {
        return (
            <Layout title="Ckeckout | LOJA SID SURF STORE">
                <Cabecalho simples
                    title={""} />
                <UpdateOrCreateNewDelivery/>
                <Rodape />
            </Layout>
        );
    };
};

